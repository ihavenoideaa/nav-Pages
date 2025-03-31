document.addEventListener("DOMContentLoaded", async () => {
  
  try {
    const response = await fetch(umami_api);
    const { data } = await response.json();

    const umami_list = document.getElementById("umami-rang");
    
    for (const [index, item] of data.entries()) {
      const link_count_info_json = { ...item };;
      delete link_count_info_json.count;
      const link_json_str = JSON.stringify(link_count_info_json);
      const escapedStr = htmlEscape(link_json_str);
      if(item.title) {
        umami_list.innerHTML += `
          <div class="url-card col-6  col-sm-6 col-md-4 col-xl-5a col-xxl-6a">
            <div class="url-body default">
                <a href="${item.url}" target="_blank" data-id="" data-url="${item.url}"
                data-umami-event="link_visit_count" data-umami-event-link_count_info="${escapedStr}" title="访问次数 ${item.count}"
                class="card no-c mb-4" data-toggle="tooltip" data-placement="bottom" data-original-title="${item.description}">
                <div class="card-body" style="position: relative;">
                    <div class="url-content d-flex align-items-center">
                        <div class="url-img mr-2 d-flex align-items-center justify-content-center">
                            <img class="lazy" src="${item.log}" data-src="${item.log}"
                                onerror="javascript:this.src='assets/images/default_logo.png'" alt="${item.title}">
                        </div>
                        <div class="url-info flex-fill">
                            <div class="text-sm overflowClip_1">
                                <strong>${item.title}</strong>
                            </div>
                            <p class="overflowClip_1 m-0 text-muted text-xs">${item.description}</p>
                        </div>
                      </div>
                      <p style="color:#6c757d;font-size:10px;position:absolute;bottom:0.23rem;right:.825rem;">${item.count}</p>
                </div>
                </a>
                <a href="${item.url}" class="togo text-center text-muted is-views"
                data-id="689" data-toggle="tooltip" data-placement="right" title="直达" rel="nofollow">
                <i class="iconfont icon-goto"></i>
                </a>
            </div>
          </div>
        `;
      }
      if(index >= 10) {
        break;
      }
    }
    
  } catch (error) {
    console.log("\n %c Umami API 错误 %c %s \n", "color: #ffffff; background: #f1404b; padding:5px 0;", "background: #030307; padding:5px 0;", umami_api);
    const container = document.getElementById("umami-rang-container");
    if (container) {
        container.remove();
    }
    console.error('Error fetching post:', error);
    return null;
  }

});


function htmlEscape(str) {
  return str.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}