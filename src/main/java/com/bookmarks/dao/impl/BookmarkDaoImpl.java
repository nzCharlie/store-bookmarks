/**
 * 
 */
package com.bookmarks.dao.impl;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Repository;

import com.bookmarks.dao.BookmarkDao;
import com.bookmarks.models.Bookmark;
import com.google.common.base.Predicate;
import com.google.common.collect.Iterables;

/**
 * @author charlie
 *
 */
@Repository
public class BookmarkDaoImpl implements BookmarkDao {

	private static Bookmark bookmark1;
	private static Bookmark bookmark2;
	
	static {
		bookmark1 = new Bookmark();
		bookmark1.setId(1L);
		bookmark1.setCreated(new Date());
		bookmark1.setUpdated(bookmark1.getCreated());
		bookmark1.setName("bookmark1");
		bookmark1.setUrl("http://1.test.com");
		
		bookmark2 = new Bookmark();
		bookmark2.setId(2L);
		bookmark2.setCreated(new Date());
		bookmark2.setUpdated(bookmark2.getCreated());
		bookmark2.setName("bookmark2");
		bookmark2.setUrl("http://2.test.com");
	}
	
	/* (non-Javadoc)
	 * @see com.bookmarks.dao.BookmarkDao#getAllBookmarks()
	 */
	@Override
	public List<Bookmark> getAllBookmarks() {	
		return Arrays.asList(bookmark1, bookmark2);
	}

	/* (non-Javadoc)
	 * @see com.bookmarks.dao.BookmarkDao#getBookmark(java.lang.Long)
	 */
	@Override
	public Bookmark getBookmark(final Long id) {
		return  Iterables.find(getAllBookmarks(), new Predicate<Bookmark>() {
			public boolean apply(Bookmark input) {
				return ObjectUtils.equals(id, input.getId());
			}
		});
	}

	/* (non-Javadoc)
	 * @see com.bookmarks.dao.BookmarkDao#saveOrUpdateBookmark(com.bookmarks.models.Bookmark)
	 */
	@Override
	public void saveOrUpdateBookmark(Bookmark bookmark) {
		// not implemented
	}

	/* (non-Javadoc)
	 * @see com.bookmarks.dao.BookmarkDao#delete1Bookmark(java.lang.Long)
	 */
	@Override
	public void delete1Bookmark(Long id) {
		// not implemented
	}

}
