library('rvest')

share_url = "https://www.blackducksoftware.com/resources/data/this-years-language-use"
id = 'listTable'

# share_page = html(share_url)
# result = html_table(html_nodes(share_page, id))

result = read.csv('black-duck-lang.csv', header=TRUE, sep= ',');



highlight = function(rank) {
  colors = grey.colors(length(result[,2]))
  colors[rank] = '#FF0049'
  return(colors)
}





# Simple Pie Chart
# slices <- c(10, 12,4, 16, 8)
# lbls <- c("US", "UK", "Australia", "Germany", "France")

labels = result[,1]
Percentages = result[,2]
js_rank = grep('Javascript', labels)
colors = highlight(js_rank)
pie(result[,2], labels=result[,1], main="Language repartition", col=colors)