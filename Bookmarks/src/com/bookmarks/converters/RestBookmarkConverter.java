/**
 * 
 */
package com.bookmarks.converters;

import java.util.HashSet;
import java.util.Set;

import org.springframework.core.convert.TypeDescriptor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.core.convert.converter.GenericConverter;
import org.springframework.stereotype.Component;

import com.bookmarks.models.Bookmark;
import com.bookmarks.models.rest.RestBookmark;

/**
 * @author charlie
 *
 */
@Component("restBookmarkConverter")
public class RestBookmarkConverter implements GenericConverter  {

	/* (non-Javadoc)
	 * @see org.springframework.core.convert.converter.GenericConverter#getConvertibleTypes()
	 */
	@Override
	public Set<ConvertiblePair> getConvertibleTypes() {
		Set<ConvertiblePair> set = new HashSet<>();
		set.add(new ConvertiblePair(Bookmark.class, RestBookmark.class));
		set.add(new ConvertiblePair(RestBookmark.class, Bookmark.class));
		return set;
	}

	/* (non-Javadoc)
	 * @see org.springframework.core.convert.converter.GenericConverter#convert(java.lang.Object, org.springframework.core.convert.TypeDescriptor, org.springframework.core.convert.TypeDescriptor)
	 */
	@Override
	public Object convert(Object source, TypeDescriptor sourceType,TypeDescriptor targetType) {
		if (sourceType.isAssignableTo(TypeDescriptor.valueOf(RestBookmark.class))) {
			return ((RestBookmark) source).getEntity();
		}
		return new RestBookmark((Bookmark) source);
	}

}
