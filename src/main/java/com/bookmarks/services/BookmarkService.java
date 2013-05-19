/**
 * 
 */
package com.bookmarks.services;

import java.util.List;

import com.bookmarks.models.Bookmark;

/**
 * @author charlie
 *
 */
public interface BookmarkService {
	List<Bookmark> getAllBookmarks();
	
	void saveOrUpdateBookmark(Bookmark bookmark);
	Bookmark getBookmark(Long id);
	void deleteBookmark(Long id);
}
