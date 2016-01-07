-- https://bigquery.cloud.google.com/

SELECT repository_language, count(repository_language) AS repos_by_lang
FROM [githubarchive:github.timeline]
WHERE repository_fork == 'false'
AND type == 'CreateEvent'
AND PARSE_UTC_USEC(repository_created_at) >= PARSE_UTC_USEC('2015-01-01 00:00:00')
AND PARSE_UTC_USEC(repository_created_at) < PARSE_UTC_USEC('2015-12-31 00:00:00')
GROUP BY repository_language
ORDER BY repos_by_lang DESC
LIMIT 10



SELECT 
  repository_language,
  MAX(lang_usage) AS lang_usage,
FROM (
  SELECT  
      repository_language,
      count(repository_language) OVER (PARTITION BY repository_language) AS lang_usage,
  from
      [githubarchive:github.timeline]
  WHERE
      repository_language != ''
      and PARSE_UTC_USEC(created_at) >= PARSE_UTC_USEC('2016-01-01 00:00:00')
      and PARSE_UTC_USEC(created_at) < PARSE_UTC_USEC('2016-04-01 00:00:00')
)
group each by repository_language