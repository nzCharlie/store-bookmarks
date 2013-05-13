/**
 * 
 */
package com.bookmarks.dao.impl;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Answers;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.bookmarks.dao.BookmarkDao;
import com.bookmarks.models.Bookmark;
import com.googlecode.objectify.Objectify;
import com.googlecode.objectify.ObjectifyFactory;
import com.googlecode.objectify.Ref;
import com.googlecode.objectify.Result;

/**
 * @author charlie
 *
 */
public class BookmarkDaoImplTest {

	private BookmarkDao bookmarkDao;
	private @Mock ObjectifyFactory objectifyFactoryMock;
	private @Mock(answer = Answers.RETURNS_DEEP_STUBS) Objectify ofyMock;
	
	/**
	 * @throws java.lang.Exception
	 */
	@Before
	public void setUp() throws Exception {
		MockitoAnnotations.initMocks(this);
		
		this.bookmarkDao = new BookmarkDaoImpl();
		((BookmarkDaoImpl) this.bookmarkDao).setObjectifyFactory(objectifyFactoryMock);
		
		stub(objectifyFactoryMock.begin()).toReturn(ofyMock);
	}

	/**
	 * Test method for {@link com.bookmarks.dao.impl.BookmarkDaoImpl#getBookmark(java.lang.Long)}.
	 */
	@Test
	public final void testGetBookmark() {
		Long idToGet = 1L;
		Bookmark bookmark = new Bookmark();		
		Ref<Bookmark> ref = mock(Ref.class);
		stub(this.ofyMock.load().type(Bookmark.class).id(idToGet)).toReturn(ref);
		stub(ref.get()).toReturn(bookmark);
		
		Bookmark returned = this.bookmarkDao.getBookmark(idToGet);
		assertSame(bookmark, returned);
	}

	/**
	 * Test method for {@link com.bookmarks.dao.impl.BookmarkDaoImpl#saveOrUpdateBookmark(com.bookmarks.models.Bookmark)}.
	 */
	@SuppressWarnings("rawtypes")
	@Test
	public final void testSaveOrUpdateBookmark() {
		Bookmark bookmark = new Bookmark();
		Result result = mock(Result.class); 
		
		stub(this.ofyMock.save().entities(same(bookmark))).toReturn(result);
		this.bookmarkDao.saveOrUpdateBookmark(bookmark);
		
		verify(result).now();
	}

	/**
	 * Test method for {@link com.bookmarks.dao.impl.BookmarkDaoImpl#delete1Bookmark(java.lang.Long)}.
	 */
	@Test
	public final void testDelete1Bookmark() {
		Long idToDelete = 1L;
		Result<Void> result = mock(Result.class); 
		
		stub(this.ofyMock.delete().type(Bookmark.class).id(1L)).toReturn(result);
		this.bookmarkDao.delete1Bookmark(idToDelete);
		
		verify(result).now();
	}

	/**
	 * Test method for {@link com.bookmarks.dao.impl.BookmarkDaoImpl#getAllBookmarks()}.
	 */
	@Test
	public final void testGetAllBookmarks() {
		List<Bookmark> bookmarks = new ArrayList<Bookmark>();		
		Ref<Bookmark> ref = mock(Ref.class);
		stub(this.ofyMock.load().type(Bookmark.class).list()).toReturn(bookmarks);
		
		List<Bookmark> returned = this.bookmarkDao.getAllBookmarks();
		assertSame(bookmarks, returned);
	}

}
