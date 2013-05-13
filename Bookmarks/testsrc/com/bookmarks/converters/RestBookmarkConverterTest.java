/**
 * 
 */
package com.bookmarks.converters;

import static org.junit.Assert.*;

import java.util.Set;

import org.junit.Before;
import org.junit.Test;
import org.springframework.core.convert.TypeDescriptor;

import com.bookmarks.models.Bookmark;
import com.bookmarks.models.rest.RestBookmark;

/**
 * @author charlie
 *
 */
public class RestBookmarkConverterTest extends RestBookmarkConverter {

	private RestBookmarkConverter converter;
	
	/**
	 * @throws java.lang.Exception
	 */
	@Before
	public void setUp() throws Exception {
		this.converter = new RestBookmarkConverter();
	}

	/**
	 * Test method for {@link com.bookmarks.converters.RestBookmarkConverter#getConvertibleTypes()}.
	 */
	@Test
	public final void testGetConvertibleTypes() {
		Set<ConvertiblePair> convertibleTypes = this.converter.getConvertibleTypes();
		
		assertTrue(convertibleTypes.contains(new ConvertiblePair(Bookmark.class, RestBookmark.class)));
		assertTrue(convertibleTypes.contains(new ConvertiblePair(RestBookmark.class, Bookmark.class)));
		assertEquals(2, convertibleTypes.size());
	}

	/**
	 * Test method for {@link com.bookmarks.converters.RestBookmarkConverter#convert(java.lang.Object, org.springframework.core.convert.TypeDescriptor, org.springframework.core.convert.TypeDescriptor)}.
	 */
	@Test
	public final void testConvertWrappedToEntity() {
		// given 
		Bookmark entity = new Bookmark();
		RestBookmark wrapped = new RestBookmark(entity);
		
		Object converted = this.converter.convert(wrapped, TypeDescriptor.forObject(wrapped), TypeDescriptor.forObject(entity));
		assertSame(entity, converted);
	}

	/**
	 * Test method for {@link com.bookmarks.converters.RestBookmarkConverter#convert(java.lang.Object, org.springframework.core.convert.TypeDescriptor, org.springframework.core.convert.TypeDescriptor)}.
	 */
	@Test
	public final void testConvertEntityToWrapped() {
		// given 
		Bookmark entity = new Bookmark();
		entity.setId(1L);
		RestBookmark wrapped = new RestBookmark(entity);
		
		Object converted = this.converter.convert(entity, TypeDescriptor.forObject(entity), TypeDescriptor.forObject(wrapped));
		assertSame(wrapped, converted);
	}
}
