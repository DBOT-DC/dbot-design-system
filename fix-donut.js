// Donut Chart Fix - Override the BROKEN original functions
(function() {
    // Wait for original code to run
    setTimeout(function() {
        
        // 1. Fix the name->index mapping for segments
        const nameToIndex = {
            'Community Treasury': '0',
            'Initial Liquidity': '1', 
            'Development Fund': '2',
            'Marketing': '3',
            'DAO Rewards': '4',
            'Airdrop': '5'
        };
        
        // Add data-segment to segments matching legend order
        const segments = document.querySelectorAll('.donut-chart .donut-segment');
        segments.forEach((seg) => {
            const name = seg.getAttribute('data-name');
            seg.setAttribute('data-segment', nameToIndex[name] || '0');
        });
        
        // 2. Override showTooltip to use data-segment instead of index
        window.showTooltip = function(segment) {
            const name = segment.getAttribute('data-name');
            const amount = segment.getAttribute('data-amount');
            const percent = segment.getAttribute('data-percent');
            const segIdx = segment.getAttribute('data-segment');
            
            const tooltip = document.getElementById('chartTooltip');
            tooltip.querySelector('.tooltip-name').textContent = name;
            tooltip.querySelector('.tooltip-amount').textContent = amount;
            tooltip.querySelector('.tooltip-percent').textContent = percent;
            tooltip.classList.add('visible');
            
            // Clear all legend highlights
            document.querySelectorAll('.chart-legend .legend-item').forEach(item => 
                item.classList.remove('active'));
            
            // Highlight matching legend
            if (segIdx !== null) {
                const match = document.querySelector('.chart-legend .legend-item[data-segment="' + segIdx + '"]');
                if (match) match.classList.add('active');
            }
        };
        
        // 3. Override updateSegmentTooltip to use data-segment instead of index
        window.updateSegmentTooltip = function(segment, e) {
            const name = segment.getAttribute('data-name');
            const amount = segment.getAttribute('data-amount');
            const percent = segment.getAttribute('data-percent');
            const segIdx = segment.getAttribute('data-segment');
            
            const tooltip = document.getElementById('chartTooltip');
            tooltip.querySelector('.tooltip-name').textContent = name;
            tooltip.querySelector('.tooltip-amount').textContent = amount;
            tooltip.querySelector('.tooltip-percent').textContent = percent;
            tooltip.classList.add('visible');
            
            tooltip.style.left = e.clientX + 'px';
            tooltip.style.top = e.clientY + 'px';
            tooltip.style.transform = 'translate(0, -100%)';
            tooltip.style.bottom = 'auto';
            
            // Clear all legend highlights
            document.querySelectorAll('.chart-legend .legend-item').forEach(item => 
                item.classList.remove('active'));
            
            // Highlight matching legend
            if (segIdx !== null) {
                const match = document.querySelector('.chart-legend .legend-item[data-segment="' + segIdx + '"]');
                if (match) match.classList.add('active');
            }
        };
        
        // 4. Override showLegendTooltip for legend items
        window.showLegendTooltip = function(item) {
            const legendName = item.querySelector('.legend-name').textContent;
            const legendPercent = item.querySelector('.legend-percent').textContent;
            const segIdx = item.getAttribute('data-segment');
            
            const tooltip = document.getElementById('chartTooltip');
            tooltip.querySelector('.tooltip-name').textContent = legendName;
            tooltip.querySelector('.tooltip-amount').textContent = '';
            tooltip.querySelector('.tooltip-percent').textContent = legendPercent;
            tooltip.classList.add('visible');
            
            // Dim all segments
            document.querySelectorAll('.donut-segment').forEach(s => s.style.opacity = '0.3');
            
            // Light up matching segment
            if (segIdx !== null) {
                const match = document.querySelector('.donut-segment[data-segment="' + segIdx + '"]');
                if (match) match.style.opacity = '1';
            }
        };
        
        console.log('Donut chart functions overridden successfully');
        
    }, 100); // Small delay to ensure original code runs first
})();
