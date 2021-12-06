"use strict";

/** Convenience middleware to handle common auth cases in routes.
 * authenticateJWT and ensureLoggedIn are pulled from express-Jobly
 * project.
*/

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const Membership = require("../database_models/Membership");
const { UnauthorizedError, NotFoundError } = require("../expressError");


/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username and isAdmin field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

const authenticateJWT = (req, res, next) => {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);

    }
    return next();
  } catch (err) {
    return next(err);
  }
}

/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */

const ensureLoggedIn = (req, res, next) => {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}

const ensureIsSiteAdmin = (req, res, next) => {
  try {
    if (!res.locals.user || !res.locals.user.isSiteAdmin) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

const ensureIsCurrentUser = (req, res, next) => {
  try {
    const user = res.locals.user;
    if(user) {
      if( user.id === req.params.id) {
        return next()
      }
    }
    throw new UnauthorizedError()
  } catch (err) {
    return next(err);
  }
}

const ensureSiteAdminOrCurrentUser = (req, res, next) => {
  try {

    const user = res.locals.user;

    if(user) {
      if(
        user.isSiteAdmin ||
        user.id === parseInt(req.params.userId,10)
      ) return next()
    }
    throw new UnauthorizedError();

  } catch (err) {
    return next(err);
  }

}

const ensureIsServerMember = async (req, res, next ) => {
  try {
    const members = await Membership.findByServer(req.params.serverId)
    if(!members.length) throw new NotFoundError("server not found")
    const membership = members.find( member => {
      if(member.user_id === res.locals.user.id) return member
    })
    if(!membership) throw new UnauthorizedError("not authorized")
    return next()
  } catch (err) {
    next(err)
  }
}

const ensureIsServerAdmin = async (req, res, next ) => {
  try {
    const members = await Membership.findByServer(req.params.serverId)
    if(!members.length){
      throw new NotFoundError("server not found")
    }
    const membership = members.find( member => {
      if(member.user_id === res.locals.user.id) return member
    })
    if(!membership || !membership.role.is_admin){
      throw new UnauthorizedError("not authorized")
    }
    return next()
  } catch (err) {
    next(err)
  }
}
const ensureIsServerAdminOrCurrentUser = async (req, res, next ) => {
  try {
    const members = await Membership.findByServer(req.params.serverId)
    if(!members.length) throw new NotFoundError("server not found")
    const membership = members.find( member => {
      if(member.user_id === res.locals.user.id) return member
    })
    if(!membership) throw new UnauthorizedError("not authorized")
    if(
      !membership.role.is_admin &&
      membership.user_id !== res.locals.user.id
    )  throw new UnauthorizedError("not authorized")
    return next()
  } catch (err) {
    next(err)
  }
}

const ensureIsMemberOrSiteAdmin = async (req, res, next ) => {
  try {
    if(res.locals.user.isSiteAdmin) return next()
    const members = await Membership.findByServer(req.params.serverId)
    if(!members.length) throw new NotFoundError("server not found")
    const membership = members.find( member => {
      if(member.user_id === res.locals.user.id) return member
    })
    if(!membership) throw new UnauthorizedError("not authorized")
    return next()
  } catch (err) {
    next(err)
  }
}

const ensureIsServerOrSiteAdmin = async (req, res, next ) => {
  try {
    if (res.locals.user.isSiteAdmin) return next()
    const members = await Membership.findByServer(req.params.serverId)
    if(!members.length) throw new NotFoundError("server not found")
    const membership = members.find( member => {
      if(member.user_id === res.locals.user.id) return member
    })
    if(!membership || !membership.role.is_admin){
      throw new UnauthorizedError("not authorized")
    }
    return next()
  } catch (err) {
    next(err)
  }
}




module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureIsSiteAdmin,
  ensureIsCurrentUser,
  ensureSiteAdminOrCurrentUser,
  ensureIsServerMember,
  ensureIsServerAdmin,
  ensureIsMemberOrSiteAdmin,
  ensureIsServerOrSiteAdmin,
  ensureIsServerAdminOrCurrentUser
};
