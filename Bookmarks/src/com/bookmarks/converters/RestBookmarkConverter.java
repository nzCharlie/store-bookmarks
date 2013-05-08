/**
 * 
 */
package com.bookmarks.converters;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.bookmarks.models.Bookmark;
import com.bookmarks.models.rest.RestBookmark;

/**
 * @author charlie
 *
 */
@Component("restBookmarkConverter")
public class RestBookmarkConverter implements Converter<Bookmark, RestBookmark> {

	/* (non-Javadoc)
	 * @see org.springframework.core.convert.converter.Converter#convert(java.lang.Object)
	 */
	@Override
	public RestBookmark convert(Bookmark bookmark) {
		return new RestBookmark(bookmark);
	}

}
