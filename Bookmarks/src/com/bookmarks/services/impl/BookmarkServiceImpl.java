/**
 * 
 */
package com.bookmarks.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookmarks.dao.BookmarkDao;
import com.bookmarks.models.Bookmark;
import com.bookmarks.services.BookmarkService;

/**
 * @author charlie
 *
 */
@Service
public class BookmarkServiceImpl implements BookmarkService {

	private BookmarkDao dao;
	
	/**
	 * @param dao the dao to set
	 */
	@Autowired
	public void setDao(BookmarkDao dao) {
		this.dao = dao;
	}

	/* (non-Javadoc)
	 * @see com.bookmarks.services.BookmarkService#saveOrUpdateBookmark(com.bookmarks.models.Bookmark)
	 */
	@Override
	public void saveOrUpdateBookmark(Bookmark bookmark) {
		this.dao.saveOrUpdateBookmark(bookmark);
	}

	/* (non-Javadoc)
	 * @see com.bookmarks.services.BookmarkService#getBookmark(java.lang.Long)
	 */
	@Override
	public Bookmark getBookmark(Long id) {
		return this.dao.getBookmark(id);
	}

	/* (non-Javadoc)
	 * @see com.bookmarks.services.BookmarkService#deleteBookmark(java.lang.Long)
	 */
	@Override
	public void deleteBookmark(Long id) {
		this.dao.delete1Bookmark(id);
	}

}
