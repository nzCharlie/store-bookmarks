/**
 * 
 */
package com.bookmarks.dao;

import java.util.List;

import com.bookmarks.models.Bookmark;

/**
 * @author charlie
 *
 */
public interface BookmarkDao {
	List<Bookmark> getAllBookmarks();
	Bookmark getBookmark(Long id);
	void saveOrUpdateBookmark(Bookmark bookmark);
	void delete1Bookmark(Long id);
}
