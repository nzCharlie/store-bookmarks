/**
 * 
 */
package com.bookmarks.services.impl;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.bookmarks.dao.BookmarkDao;
import com.bookmarks.models.Bookmark;
import com.bookmarks.services.BookmarkService;

/**
 * @author charlie
 *
 */
public class BookmarkServiceImplTest {

	private Bookmark bookmark;
	private BookmarkService service;
	private @Mock BookmarkDao daoMock; 
	
	/**
	 * @throws java.lang.Exception
	 */
	@Before
	public void setUp() throws Exception {
		MockitoAnnotations.initMocks(this);
		
		this.service = new BookmarkServiceImpl();
		((BookmarkServiceImpl) this.service).setDao(daoMock);
		
		this.bookmark = new Bookmark();
	}

	/**
	 * Test method for {@link com.bookmarks.services.impl.BookmarkServiceImpl#saveOrUpdateBookmark(com.bookmarks.models.Bookmark)}.
	 */
	@Test
	public final void testSaveOrUpdateBookmark() {
		this.service.saveOrUpdateBookmark(bookmark);
		
		verify(this.daoMock).saveOrUpdateBookmark(same(bookmark));
	}

	/**
	 * Test method for {@link com.bookmarks.services.impl.BookmarkServiceImpl#getBookmark(java.lang.Long)}.
	 */
	@Test
	public final void testGetBookmark() {
		stub(this.daoMock.getBookmark(this.bookmark.getId())).toReturn(bookmark);
		
		Bookmark returned = this.service.getBookmark(this.bookmark.getId());
		
		assertSame(bookmark, returned);
	}

	/**
	 * Test method for {@link com.bookmarks.services.impl.BookmarkServiceImpl#deleteBookmark(java.lang.Long)}.
	 */
	@Test
	public final void testDeleteBookmark() {
		long id = 1L;
		
		this.service.deleteBookmark(id);
		
		verify(this.daoMock).delete1Bookmark(id);
	}

	/**
	 * Test method for {@link com.bookmarks.services.impl.BookmarkServiceImpl#getAllBookmarks()}.
	 */
	@Test
	public final void testGetAllBookmarks() {
		List<Bookmark> bookmarks = Arrays.asList(bookmark);
		stub(this.daoMock.getAllBookmarks()).toReturn(bookmarks);
		
		List<Bookmark> returned = this.service.getAllBookmarks();
		
		assertSame(bookmarks, returned);
	}

}
