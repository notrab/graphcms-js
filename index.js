const { jsonToGraphQLQuery, EnumType } = require("json-to-graphql-query");
const { GraphQLClient } = require("graphql-request");

class GraphCMSParams {
  model = null;
  select = null;
  where = null;
  orderBy = null;
  skip = null;
  after = null;
  before = null;
  first = null;
  last = null;
}

class GraphCMS {
  params;

  constructor(endpoint, options) {
    this.config = { endpoint, ...options };
    this.api = new GraphQLClient(endpoint, {
      ...(this.token && {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }),
    });

    this.params = new GraphCMSParams();
  }

  clear() {
    this.params = new GraphCMSParams();
  }

  model(model) {
    this.params.model = model;
    return this;
  }

  where(where) {
    this.params.where = where;
    return this;
  }

  orderBy(orderBy) {
    this.params.orderBy = new EnumType(orderBy);
    return this;
  }

  skip(skip) {
    this.params.skip = skip;
    return this;
  }

  after(after) {
    this.params.after = after;
    return this;
  }

  before(before) {
    this.params.before = before;
    return this;
  }

  first(first) {
    this.params.first = first;
    return this;
  }

  last(last) {
    this.params.last = last;
    return this;
  }

  select(select) {
    this.params.select = select;
    return this;
  }

  async exec() {
    const { model: _model, select: _select, ...__args } = this.params;

    const request = await this.api.request(
      jsonToGraphQLQuery({
        query: {
          [_model]: {
            __args,
            ..._select,
          },
        },
      })
    );

    this.clear();

    return request[_model];
  }
}

module.exports = { GraphCMS };
