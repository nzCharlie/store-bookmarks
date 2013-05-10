/**
 * 
 */
package com.bookmarks.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.bookmarks.dao.BookmarkDao;
import com.bookmarks.models.Bookmark;
import com.googlecode.objectify.Objectify;
import com.googlecode.objectify.ObjectifyFactory;

/**
 * @author charlie
 *
 */
@Repository
public class BookmarkDaoImpl implements BookmarkDao {

	private ObjectifyFactory objectifyFactory;
	
	/**
	 * @param objectifyFactory the objectifyFactory to set
	 */
	@Autowired
	public void setObjectifyFactory(ObjectifyFactory objectifyFactory) {
		this.objectifyFactory = objectifyFactory;
	}

	/* (non-Javadoc)
	 * @see com.bookmarks.dao.BookmarkDao#getBookmark(java.lang.Long)
	 */
	@Override
	public Bookmark getBookmark(Long id) {
		Objectify ofy = objectifyFactory.begin();
		return ofy.load().type(Bookmark.class).id(id).get();
	}

	/* (non-Javadoc)
	 * @see com.bookmarks.dao.BookmarkDao#saveOrUpdateBookmark(com.bookmarks.models.Bookmark)
	 */
	@Override
	public void saveOrUpdateBookmark(Bookmark bookmark) {
		Objectify ofy = objectifyFactory.begin();
		ofy.save().entities(bookmark).now();
	}

	/* (non-Javadoc)
	 * @see com.bookmarks.dao.BookmarkDao#delete1Bookmark(java.lang.Long)
	 */
	@Override
	public void delete1Bookmark(Long id) {
		Objectify ofy = objectifyFactory.begin();
		ofy.delete().type(Bookmark.class).id(id).now();
	}

	/* (non-Javadoc)
	 * @see com.bookmarks.dao.BookmarkDao#getAllBookmarks()
	 */
	@Override
	public List<Bookmark> getAllBookmarks() {
		Objectify ofy = objectifyFactory.begin();
		return ofy.load().type(Bookmark.class).list();
	}

}
