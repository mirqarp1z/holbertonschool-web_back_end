#!/usr/bin/env python3
"""
Change school topics
"""


from pymongo import MongoClient


def update_topics(mongo_collection, name, topics):
    """
    Function that changes all topics of a school document based on the name:
    """
    result = mongo_collection.update_many(
        {"name": name},
        {"$set": {"topics": topics}}
    )
    return result
