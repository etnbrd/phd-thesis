library(bigrquery)


# Language by most authors
# 
# SELECT repository_language, count(actor) AS actor
#   FROM [githubarchive:github.timeline]
#   WHERE repository_fork == 'false'
#   AND type == 'CreateEvent'
#   AND PARSE_UTC_USEC(repository_created_at) >= PARSE_UTC_USEC('2014-01-01 00:00:00')
#   AND PARSE_UTC_USEC(repository_created_at) < PARSE_UTC_USEC('2014-12-31 00:00:00')
#   GROUP BY repository_language
#   ORDER BY actor DESC
#   LIMIT 100


# TODO change the query : github.timeline is limited somehow to the very beginning of 2015.
# Instead, use githubarchive:month, the month splitting is then already done
# You only need to generate the sequence of table names from seq() -> remove hyphen, and last two digits

# query <- function(from, to) {
#   return(paste0("SELECT repository_language, count(repository_language) AS repos_by_lang 
#   FROM [githubarchive:github.timeline]
#   WHERE repository_fork == 'false'
#   AND type == 'CreateEvent'
#   AND PARSE_UTC_USEC(repository_created_at) >= PARSE_UTC_USEC('", from, " 00:00:00')
#   AND PARSE_UTC_USEC(repository_created_at) < PARSE_UTC_USEC('", to, " 00:00:00')
#   GROUP BY repository_language
#   ORDER BY repos_by_lang DESC
#   LIMIT 100")) 
# }


# SELECT
#   type,
#   COUNT(language) as repos_counts
# FROM (SELECT type, JSON_EXTRACT(payload, '$.pull_request.base.repo.language') as language FROM [githubarchive:month.201501])
# GROUP BY type
# ORDER BY repos_counts DESC


creationsPerMonth = function(year, month) {

  project = "github-analysis"

  query = function (year, month) {
    return(paste0("SELECT repository_language, count(repository_language) AS repos_by_lang 
    FROM [githubarchive:github.timeline]
    WHERE repository_fork == 'false'
    AND type == 'CreateEvent'
    AND PARSE_UTC_USEC(repository_created_at) >= PARSE_UTC_USEC('", year, "-", month, "-01 00:00:00')
    AND PARSE_UTC_USEC(repository_created_at) < PARSE_UTC_USEC('", year, "-", month, "-31 00:00:00')
    GROUP BY repository_language
    ORDER BY repos_by_lang DESC")) 
  }

  return(query_exec(query(year, month), project = project))
}



# for (month in months) {

#   message('>> ', toString(month));

#   result <- creationPerMonth(month)

#   if(exists('creations')) {
#     creations <- merge(creations, result)  
#   } else {
#     creations <- result
#   }

# }

# q1 <- query_exec(creationsPerMonth('201401'), project = project)
# q2 <- query_exec(creationsPerMonth('201402'), project = project)

# colnames(q1) <- c("lang", "Jan 2014")
# colnames(q2) <- c("lang", "Feb 2014")

# table <- merge(table, q2)


# rownames(table) <- table$lang
# table$lang <- NULL

# max(table)

# plot(table)