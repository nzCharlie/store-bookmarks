/**
 * 
 */
package com.bookmarks.dao.impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.bookmarks.dao.BookmarkDao;
import com.bookmarks.models.Bookmark;

/**
 * @author charlie
 *
 */
@Repository
public class BookmarkDaoImpl extends HibernateDaoSupport implements BookmarkDao {

	@Autowired
	public void wireSessionFactory(SessionFactory sessionFactory) {
		setSessionFactory(sessionFactory);
	}
	
	/* (non-Javadoc)
	 * @see com.bookmarks.dao.BookmarkDao#getAllBookmarks()
	 */
	@Override
	public List<Bookmark> getAllBookmarks() {
		return getHibernateTemplate().loadAll(Bookmark.class);
	}

	/* (non-Javadoc)
	 * @see com.bookmarks.dao.BookmarkDao#getBookmark(java.lang.Long)
	 */
	@Override
	public Bookmark getBookmark(Long id) {
		return getHibernateTemplate().load(Bookmark.class, id);
	}

	/* (non-Javadoc)
	 * @see com.bookmarks.dao.BookmarkDao#saveOrUpdateBookmark(com.bookmarks.models.Bookmark)
	 */
	@Override
	public void saveOrUpdateBookmark(Bookmark bookmark) {
		getHibernateTemplate().saveOrUpdate(bookmark);
	}

	/* (non-Javadoc)
	 * @see com.bookmarks.dao.BookmarkDao#delete1Bookmark(java.lang.Long)
	 */
	@Override
	public void delete1Bookmark(Long id) {
		getHibernateTemplate().delete(getBookmark(id));
	}

}
