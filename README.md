# Recital Program Maker
I find formatting recital programs in word processors to be tedious, even with pre-formatted templates. Things still never line up *quite* perfectly after extensive tweaking anyways. So, I created this app to take care of all that busy work. The idea is: enter all the information for your recital and it will spit out a perfectly formatted program. No tweaking margins, spacing, or anything! 

**Supported browsers**: Chrome, Firefox

**Note**: there is an issue with the way the program looks on smaller devices. This is being worked on, but programs will still print properly formatted (you can use "Preview" to confirm this). It's also worth noting that "Preview" tends to slightly distort the image, but when you click "Print" you'll get a perfectly clear representation of the final product.


## New features
- Hover over program entries for options to move, edit, and delete
- Toggle "Place performer(s) on top" to swap the positions of performers and pieces


## How-To
Upload a spreadsheet:
- grab the template from [this link](https://docs.google.com/spreadsheets/d/1CK7CRbGqo_S3vZ2KLCFBSKyBFl5XKLUXu73X-q1-2aI/edit#gid=0)
- there is an example tab at the bottom showing how to fill out the template
- copy the template to your Google drive, or download a copy to your device
- make sure to download it as a .csv file
- when you're ready, save the completed template (as a .csv) and click the upload button on the site
- when you load the file, the program will fill automatically


## Note
When using the preview option, the image is slightly distorted. For a clearer image of what the final product will look like, click the print button instead. It will open a new tab where you can view the program as it will look when printed.

While it's possible to adjust the program order within a page, moving a performer to a different page breaks the print functionality and is thus disabled. If you need to swap the positions of performers that are on different pages, edit the entries instead and reenter their information in their new positions.


## TO DO
- [x] Edit entries
- [x] Provide option for placing student name above piece/composer
- [ ] Fix long titles (reduce font size if width > 450)
- [ ] Adjust performance section height if only 1 or 2 performances bleed over into next page
- [ ] Add help section (basic usage, etc.)
- [ ] Add more horizontal line styles
- [x] Mobile compatibility
- [ ] Implement dropzone
- [ ] Toggle page visibility
- [ ] Cookies for saving programs?
