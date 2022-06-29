export default function (model, condition) {
  return async (req, res, next) => {
    let page = parseInt(req.query.page);

    if (!page) {
      page = 1;
    }

    const limit = 4;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (page === 1 && endIndex >= (await model.countDocuments())) {
      results.page = undefined;
    } else {
      results.page = page;
    }

    if (endIndex < (await model.countDocuments())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = await model
      .find(condition)
      .limit(limit)
      .skip(startIndex)
      .sort({ createdAt: "desc" });

    res.results = results;

    next();
  };
}
