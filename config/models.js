const db = require('./db')

const post = async (tbl, obj) =>
    (await db(tbl).insert(obj).returning('*'))[0]

const get_one = async (tbl, obj) =>
    (await db(tbl).where(obj))[0]

const get_all = async (tbl, obj={}) =>
    await db(tbl).where(obj)

const get_coupons = ({query, category, limit}) => {
    const builder = db('coupons')
    if(category) builder
        .select('coupons.*', 'cat.name as category')
        .join('coupon_categories as cc', 'cc.coupon_id', 'coupons.id')
        .join('categories as cat', 'cc.category_id', 'cat.id')
        .where('name', '=', category)
    if(query) builder
        .where(query)
    if(limit) builder
        .limit(limit)
    return builder
}

module.exports = {
    get_one,
    get_all,
    get_coupons,
    post,
}