/**
 * 
 */
package com.bookmarks.dao;

import com.bookmarks.models.Bookmark;

/**
 * @author charlie
 *
 */
public interface BookmarkDao {
	Bookmark getBookmark(Long id);
	void saveOrUpdateBookmark(Bookmark bookmark);
	void delete1Bookmark(Long id);
}
