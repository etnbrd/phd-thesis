# Get StackOverflow data
get.stack<-function(tok) {
    # Must check for XML install, thanks onertipaday!
    if (!require(XML)) install.packages('XML')
    library(XML)
    # Enter a SO tag as character string, and number of tags are returned
    tok<-gsub("(/| )","-",tok)
    tok<-gsub("#","%23",tok,fixed=TRUE)
    base.stack<-"http://stackoverflow.com/questions/tagged/"
    stack.tree<-htmlTreeParse(paste(base.stack,tok,sep=""),useInternalNodes=TRUE)
    tag.count<-getNodeSet(stack.tree,"//div[@class='module']/div[@class='summarycount al']")
    tag.num<-suppressWarnings(as.numeric(gsub(",","",xmlValue(tag.count[[1]]),fixed=TRUE)))
    if(is.na(tag.num)) {
        warning(paste("Something went wrong trying to parse '",tok,"'.\nNA returned",sep=""))
    }
    return(tag.num)
}