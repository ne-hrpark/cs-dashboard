-- ============================================================
-- GET /api/stats/region_groups - 지역별 그룹
-- ============================================================
-- 실제 테이블의 지역 컬럼(region, address_region, city 등)에 맞게 수정하세요.
-- 시/도 단위로 그룹하거나, 더 세분화할 수 있습니다.
-- ============================================================

SELECT
    COALESCE(region, '미지정') AS region,
    COUNT(*) AS count
FROM Members
GROUP BY COALESCE(region, '미지정')
ORDER BY count DESC;
-- FROM YourActualMemberTable;
-- 컬럼명 예: region, address_region, sido, city
