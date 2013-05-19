/**
 * 
 */
package com.bookmarks.utils;

import java.util.Date;

import org.springframework.stereotype.Component;

/**
 * @author charlie
 *
 */
@Component
public class CurrentTimeProviderImpl implements CurrentTimeProvider {

	/* (non-Javadoc)
	 * @see com.bookmarks.utils.CurrentTimeProvider#getCurrentTime()
	 */
	@Override
	public Date getCurrentTime() {
		return new Date();
	}
	
}
