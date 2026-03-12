#!/usr/bin/env python3
"""
List all documents in Python
"""


def list_all(mongo_collection):
    """
    list all docs
    """
    return mongo_collection.find()
