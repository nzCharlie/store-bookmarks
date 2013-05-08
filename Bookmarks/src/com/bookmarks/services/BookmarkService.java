/**
 * 
 */
package com.bookmarks.services;

import com.bookmarks.models.Bookmark;

/**
 * @author charlie
 *
 */
public interface BookmarkService {
	void saveOrUpdateBookmark(Bookmark bookmark);
	Bookmark getBookmark(Long id);
	void deleteBookmark(Long id);
}
