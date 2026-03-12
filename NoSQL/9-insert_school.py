#!/usr/bin/env python3
"""
List all documents in Python
"""


from pymongo import MongoClient


def insert_school(mongo_collection, **kwargs):
    """
    Insert a new document into the specified MongoDB collection.
    """
    result = mongo_collection.insert_one(kwargs)
    return result.inserted_id
