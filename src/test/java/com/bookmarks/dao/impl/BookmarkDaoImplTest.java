package com.bookmarks.dao.impl;

import static org.junit.Assert.*;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.hibernate.ObjectNotFoundException;
import org.hibernate.SessionFactory;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import com.bookmarks.dao.BookmarkDao;
import com.bookmarks.models.Bookmark;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({
	"classpath*:applicationContext-dataSource.xml"
})
@Transactional
@Ignore("DB Unit tests are of questionable value.")
public class BookmarkDaoImplTest {

	private BookmarkDao bookmarkDao;
	@Autowired SessionFactory sessionFactory;
	
	@Before
	public void setup(){
		bookmarkDao = new BookmarkDaoImpl();
		((BookmarkDaoImpl) bookmarkDao).setSessionFactory(sessionFactory);
	}
	
	@Test
	public final void testGetAllBookmarks() {
		List<Bookmark> allBookmarks = bookmarkDao.getAllBookmarks();
		assertEquals(2, allBookmarks.size());
	}

	@Test
	public final void testGetBookmark() {
		Bookmark bookmark = bookmarkDao.getBookmark(-1L);
		
		assertEquals("first", bookmark.getName());
		assertEquals("http://www.first.com", bookmark.getUrl());
		assertEquals("This is the first one.", bookmark.getDescription());
	}

	@Test
	public final void testSaveOrUpdateBookmark() {
		final String description = "new description";
		
		Bookmark bookmark = bookmarkDao.getBookmark(-1L);
		bookmark.setDescription(description);
		bookmarkDao.saveOrUpdateBookmark(bookmark);
		
		Bookmark updated = bookmarkDao.getBookmark(-1L);
		assertEquals(description, updated.getDescription());
	}

	@Test
	public final void testDelete1Bookmark() {
		bookmarkDao.delete1Bookmark(-1L);
		
		try {
			bookmarkDao.getBookmark(-1L);
			fail("expect an exception thrown.");
		} catch (Exception e) {
			// passed
		}
	}

}
