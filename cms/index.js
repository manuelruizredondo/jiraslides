window.CMS_MANUAL_INIT = true

import CMS from 'decap-cms-app'
import cloudinary from 'netlify-cms-media-library-cloudinary';
import config from "./config";

// Initialize NetlifyCMS with the JS configuration objext
window.CMS_CONFIGURATION = config;

CMS.registerMediaLibrary(cloudinary);

CMS.init({ config });

// Register the custom editor components  here
