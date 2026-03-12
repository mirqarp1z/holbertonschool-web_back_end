#!/usr/bin/env python3
"""
 Simple helper function
"""


def index_range(page, page_size) -> tuple:
    """
    Return a tuple of size two containing a start
    index and an end index
    """
    start_page = (page - 1) * page_size
    end_page = start_page + page_size
    return (start_page, end_page)
