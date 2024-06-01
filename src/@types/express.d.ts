// Extend Express "Request" interface, using declaration merging
// https://christiangiacomi.com/posts/extend-express-typescript-custom-types/

declare namespace Express {
    interface Request {
        payload?: {};
    }
}
