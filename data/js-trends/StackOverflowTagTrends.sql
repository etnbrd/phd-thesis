-- http://data.stackexchange.com/stackoverflow/query/edit/418570

-- Also see this query, that seems very interesting
-- http://data.stackexchange.com/stackoverflow/query/158332/tag-trend-comparison-graph
--

WITH date 
     AS (SELECT y.number year, 
                m.number month 
         FROM   master..spt_values y 
                CROSS JOIN master..spt_values m 
         WHERE  y.type = 'P' 
                AND y.number >= 2006 
                AND m.type = 'P' 
                AND m.number >= 1 
                AND m.number <= 12) 
SELECT date, 
       C,
       "C++",
       "C#"
       Java,
       PHP,
       Ruby,
       Python,
       SQL,
       Javascript
       
FROM   (SELECT t.tagname, 
               cast(Cast(ym.year AS CHAR(4)) + CASE WHEN ym.month < 10 THEN '0' 
               ELSE 
                      '' END 
                      + Cast(ym.month AS CHAR(2)) as int) date, 
               p.id 
        FROM   posts p 
               INNER JOIN posttags pt 
                       ON p.id = pt.postid 
               INNER JOIN tags t 
                       ON pt.tagid = t.id 
               INNER JOIN date ym 
                       ON Year(p.creationdate) = ym.year 
                          AND Month(p.creationdate) = ym.month 
        WHERE  t.tagname IN ( 'c', 'c++', 'c#', 'java', 'php', 'ruby', 'python', 'sql', 'javascript' )) 
       AS data 
       PIVOT ( Count(id) 
             FOR tagname IN (c, "c++", "c#", java, php, ruby, python, sql, javascript) ) AS pivottable 
ORDER  BY date