const { jsonToGraphQLQuery } = require("json-to-graphql-query");
const { GraphQLClient } = require("graphql-request");

class GraphCMS {
  constructor(endpoint, options) {
    this.config = { endpoint, ...options };
    this.api = new GraphQLClient(endpoint, {
      ...(this.token && {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }),
    });
    this._model = null;
    this._where = null;
    this._first = null;
    this._skip = null;
    this._select = null;
  }

  clear() {
    this._model = null;
    this._where = null;
    this._first = null;
    this._skip = null;
    this._select = null;
  }

  model(model) {
    this._model = model;
    return this;
  }

  where(where) {
    this._where = where;
    return this;
  }

  first(first) {
    this._first = first;
    return this;
  }

  skip(skip) {
    this._skip = skip;
    return this;
  }

  select(select) {
    this._select = select;
    return this;
  }

  async exec() {
    const { _model, _where, _first, _skip, _select } = this;

    const request = await this.api.request(
      jsonToGraphQLQuery({
        query: {
          [_model]: {
            __args: {
              ...(_where && {
                where: _where,
              }),
              ...(_first && {
                first: _first,
              }),
              ...(_skip && {
                skip: _skip,
              }),
            },
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
