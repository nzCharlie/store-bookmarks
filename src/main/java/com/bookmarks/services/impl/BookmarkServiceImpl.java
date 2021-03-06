/**
 * 
 */
package com.bookmarks.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookmarks.dao.BookmarkDao;
import com.bookmarks.models.Bookmark;
import com.bookmarks.services.BookmarkService;
import com.bookmarks.utils.CurrentTimeProvider;

/**
 * @author charlie
 *
 */
@Service
public class BookmarkServiceImpl implements BookmarkService {

	private BookmarkDao dao;
	private CurrentTimeProvider currentTimeProvider;
	
	/**
	 * @param dao the dao to set
	 */
	@Autowired
	public void setDao(BookmarkDao dao) {
		this.dao = dao;
	}

	/**
	 * @param currentTimeProvider the currentTimeProvider to set
	 */
	@Autowired
	public void setCurrentTimeProvider(CurrentTimeProvider currentTimeProvider) {
		this.currentTimeProvider = currentTimeProvider;
	}

	/* (non-Javadoc)
	 * @see com.bookmarks.services.BookmarkService#saveOrUpdateBookmark(com.bookmarks.models.Bookmark)
	 */
	@Override
	@Transactional
	public void saveOrUpdateBookmark(Bookmark bookmark) {
		bookmark.setUpdated(this.currentTimeProvider.getCurrentTime());
		this.dao.saveOrUpdateBookmark(bookmark);
	}

	/* (non-Javadoc)
	 * @see com.bookmarks.services.BookmarkService#getBookmark(java.lang.Long)
	 */
	@Override
	@Transactional
	public Bookmark getBookmark(Long id) {
		return this.dao.getBookmark(id);
	}

	/* (non-Javadoc)
	 * @see com.bookmarks.services.BookmarkService#deleteBookmark(java.lang.Long)
	 */
	@Override
	@Transactional
	public void deleteBookmark(Long id) {
		this.dao.delete1Bookmark(id);
	}

	/* (non-Javadoc)
	 * @see com.bookmarks.services.BookmarkService#getAllBookmarks()
	 */
	@Override
	@Transactional
	public List<Bookmark> getAllBookmarks() {
		return this.dao.getAllBookmarks();
	}

}
