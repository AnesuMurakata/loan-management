import graphene
from flask import Blueprint
from flask_graphql import GraphQLView
from models.graphql_query import Query
from models.mutations.graphql_mutation import Mutation

# Define the GraphQL Blueprint
graphql_bp = Blueprint("graphql", __name__)

schema = graphene.Schema(query=Query, mutation=Mutation)

graphql_bp.add_url_rule(
    "/graphql", view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True)
)
