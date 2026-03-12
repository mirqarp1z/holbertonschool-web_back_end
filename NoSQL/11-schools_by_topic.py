#!/usr/bin/env python3
"""
Change school topics
"""


from pymongo import MongoClient


def schools_by_topic(mongo_collection, topic):
    """lists specific topic"""
    result = mongo_collection.find({"topics": topic})
    return result
