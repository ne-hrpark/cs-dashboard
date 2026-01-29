-- ============================================================
-- GET /api/stats/age_groups - 연령대별 그룹
-- ============================================================
-- 실제 테이블의 생년월일(birth_date) 또는 나이(age) 컬럼에 맞게 수정하세요.
-- 연령대 구간(10대, 20대 등)은 비즈니스 규칙에 맞게 변경 가능합니다.
-- ============================================================

SELECT
    CASE
        WHEN DATEDIFF(YEAR, birth_date, GETDATE()) < 20 THEN '10대 이하'
        WHEN DATEDIFF(YEAR, birth_date, GETDATE()) BETWEEN 20 AND 29 THEN '20대'
        WHEN DATEDIFF(YEAR, birth_date, GETDATE()) BETWEEN 30 AND 39 THEN '30대'
        WHEN DATEDIFF(YEAR, birth_date, GETDATE()) BETWEEN 40 AND 49 THEN '40대'
        WHEN DATEDIFF(YEAR, birth_date, GETDATE()) BETWEEN 50 AND 59 THEN '50대'
        ELSE '60대 이상'
    END AS ageGroup,
    COUNT(*) AS count
FROM Members
WHERE birth_date IS NOT NULL
GROUP BY
    CASE
        WHEN DATEDIFF(YEAR, birth_date, GETDATE()) < 20 THEN '10대 이하'
        WHEN DATEDIFF(YEAR, birth_date, GETDATE()) BETWEEN 20 AND 29 THEN '20대'
        WHEN DATEDIFF(YEAR, birth_date, GETDATE()) BETWEEN 30 AND 39 THEN '30대'
        WHEN DATEDIFF(YEAR, birth_date, GETDATE()) BETWEEN 40 AND 49 THEN '40대'
        WHEN DATEDIFF(YEAR, birth_date, GETDATE()) BETWEEN 50 AND 59 THEN '50대'
        ELSE '60대 이상'
    END
ORDER BY MIN(DATEDIFF(YEAR, birth_date, GETDATE()));
-- FROM YourActualMemberTable;
-- 컬럼이 age(숫자)인 경우: CASE WHEN age < 20 THEN '10대 이하' ... 등으로 단순화 가능
