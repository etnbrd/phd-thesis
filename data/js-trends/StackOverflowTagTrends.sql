-- http://data.stackexchange.com/stackoverflow/query/

-- Also see this query, that seems very interesting
-- http://data.stackexchange.com/stackoverflow/query/158332/tag-trend-comparison-graph
--

WITH yearmonth 
     AS (SELECT y.number year, 
                m.number month 
         FROM   master..spt_values y 
                CROSS JOIN master..spt_values m 
         WHERE  y.type = 'P' 
                AND y.number >= 2006 
                AND m.type = 'P' 
                AND m.number >= 1 
                AND m.number <= 12) 
SELECT yearmonth, 
       javascript,
       java
FROM   (SELECT t.tagname, 
               cast(Cast(ym.year AS CHAR(4)) + CASE WHEN ym.month < 10 THEN '0' 
               ELSE 
                      '' END 
                      + Cast(ym.month AS CHAR(2)) as int) yearmonth, 
               p.id 
        FROM   posts p 
               INNER JOIN posttags pt 
                       ON p.id = pt.postid 
               INNER JOIN tags t 
                       ON pt.tagid = t.id 
               INNER JOIN yearmonth ym 
                       ON Year(p.creationdate) = ym.year 
                          AND Month(p.creationdate) = ym.month 
        WHERE  t.tagname IN ( 'javascript', 'java' )) 
       AS data 
       PIVOT ( Count(id) 
             FOR tagname IN (javascript, java) ) AS pivottable 
ORDER  BY yearmonth