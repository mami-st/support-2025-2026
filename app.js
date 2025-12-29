/**
 * 生活困窮者支援サイト - メインアプリケーション
 * フィルタリング、検索、地図連携機能を実装
 */

(function() {
  'use strict';

  // ============================================
  // アプリケーション状態
  // ============================================
  const state = {
    searchQuery: '',
    prefectures: [],  // 複数選択対応に変更
    serviceTypes: [],  // 複数選択対応
    selectedDate: '',
    filteredOffers: []
  };

  // ============================================
  // DOM要素の参照
  // ============================================
  const elements = {
    searchInput: null,
    prefectureFilter: null,
    serviceFilter: null,
    dateFilter: null,
    filterReset: null,
    offersGrid: null,
    resultsCount: null,
    currentFilters: null
  };

  // ============================================
  // 今日の日付を取得
  // ============================================
  function getTodayDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // ============================================
  // 初期化
  // ============================================
  function init() {
    // DOM要素を取得
    elements.searchInput = document.getElementById('search-input');
    elements.prefectureFilter = document.getElementById('prefecture-filter');
    elements.serviceFilter = document.getElementById('service-filter');
    elements.dateFilter = document.getElementById('date-filter');
    elements.filterReset = document.getElementById('filter-reset');
    elements.offersGrid = document.getElementById('offers-grid');
    elements.resultsCount = document.getElementById('results-count');
    elements.currentFilters = document.getElementById('current-filters');

    // 今日の日付ボタンに「（今日）」を追加
    addTodayLabel();

    // イベントリスナーを設定
    setupEventListeners();

    // 初期表示
    applyFilters();
    
    // 初期状態で「すべて」ボタンをアクティブに
    const allDateBtn = elements.dateFilter.querySelector('[data-date=""]');
    if (allDateBtn) {
      allDateBtn.classList.add('active');
    }
    const allPrefBtn = elements.prefectureFilter.querySelector('[data-pref=""]');
    if (allPrefBtn) {
      allPrefBtn.classList.add('active');
    }
    const allServiceBtn = elements.serviceFilter.querySelector('[data-service=""]');
    if (allServiceBtn) {
      allServiceBtn.classList.add('active');
    }
  }

  // ============================================
  // 今日の日付ボタンに「（今日）」ラベルを追加
  // ============================================
  function addTodayLabel() {
    const todayDate = getTodayDateString();
    const todayBtn = elements.dateFilter.querySelector(`[data-date="${todayDate}"]`);
    if (todayBtn) {
      // 曜日を（今日）に置き換え
      todayBtn.textContent = todayBtn.textContent.replace(/（[日月火水木金土]）/, '（今日）');
    }
  }

  // ============================================
  // イベントリスナー設定
  // ============================================
  function setupEventListeners() {
    // 検索入力（デバウンス付き）
    let searchTimeout;
    elements.searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        state.searchQuery = e.target.value.trim().toLowerCase();
        applyFilters();
      }, 300);
    });

    // 地域フィルター（複数選択対応）
    elements.prefectureFilter.addEventListener('click', (e) => {
      const btn = e.target.closest('.pref-btn');
      if (!btn) return;
      
      const pref = btn.dataset.pref;
      
      if (pref === '') {
        // 「すべて」をクリックした場合
        elements.prefectureFilter.querySelectorAll('.pref-btn').forEach(b => {
          b.classList.remove('active');
        });
        btn.classList.add('active');
        state.prefectures = [];
      } else {
        // 個別の地域をクリックした場合
        const allBtn = elements.prefectureFilter.querySelector('[data-pref=""]');
        if (allBtn) allBtn.classList.remove('active');
        
        if (btn.classList.contains('active')) {
          btn.classList.remove('active');
          state.prefectures = state.prefectures.filter(p => p !== pref);
          // 何も選択されていなければ「すべて」をアクティブに
          if (state.prefectures.length === 0 && allBtn) {
            allBtn.classList.add('active');
          }
        } else {
          btn.classList.add('active');
          state.prefectures.push(pref);
        }
      }
      
      applyFilters();
    });

    // 支援メニューフィルター（複数選択対応）
    elements.serviceFilter.addEventListener('click', (e) => {
      const btn = e.target.closest('.service-btn');
      if (!btn) return;
      
      const service = btn.dataset.service;
      
      if (service === '') {
        // 「すべて」をクリックした場合
        elements.serviceFilter.querySelectorAll('.service-btn').forEach(b => {
          b.classList.remove('active');
        });
        btn.classList.add('active');
        state.serviceTypes = [];
      } else {
        // 個別のサービスをクリックした場合
        const allBtn = elements.serviceFilter.querySelector('[data-service=""]');
        if (allBtn) allBtn.classList.remove('active');
        
        if (btn.classList.contains('active')) {
          btn.classList.remove('active');
          state.serviceTypes = state.serviceTypes.filter(s => s !== service);
          // 何も選択されていなければ「すべて」をアクティブに
          if (state.serviceTypes.length === 0 && allBtn) {
            allBtn.classList.add('active');
          }
        } else {
          btn.classList.add('active');
          state.serviceTypes.push(service);
        }
      }
      
      applyFilters();
    });

    // 日付フィルター（ボタン群）
    elements.dateFilter.addEventListener('click', (e) => {
      if (e.target.classList.contains('date-btn')) {
        // 全ボタンからactiveを削除
        elements.dateFilter.querySelectorAll('.date-btn').forEach(btn => {
          btn.classList.remove('active');
        });
        // クリックしたボタンにactiveを追加
        e.target.classList.add('active');
        state.selectedDate = e.target.dataset.date;
        
        applyFilters();
      }
    });

    // フィルターリセット
    elements.filterReset.addEventListener('click', resetFilters);
  }

  // ============================================
  // フィルター適用
  // ============================================
  function applyFilters() {
    const offers = SUPPORT_DATA.offers;
    
    state.filteredOffers = offers.filter(offer => {
      // 検索クエリでフィルター
      if (state.searchQuery) {
        const searchText = [
          offer.providerName,
          offer.serviceName,
          offer.location,
          offer.prefecture,
          offer.area,
          offer.sourceText || ''
        ].join(' ').toLowerCase();
        
        if (!searchText.includes(state.searchQuery)) {
          return false;
        }
      }

      // 地域でフィルター（複数選択対応）
      if (state.prefectures.length > 0) {
        if (!state.prefectures.includes(offer.prefecture)) {
          return false;
        }
      }

      // サービス種類でフィルター（複数選択対応）
      if (state.serviceTypes.length > 0) {
        const hasMatchingService = state.serviceTypes.some(type => 
          offer.serviceTypes.includes(type)
        );
        if (!hasMatchingService) {
          return false;
        }
      }

      // 日付でフィルター
      if (state.selectedDate) {
        // 日付が空の場合（随時対応）は常に表示
        if (offer.dates.length === 0) {
          return true;
        }
        if (!offer.dates.includes(state.selectedDate)) {
          return false;
        }
      }

      return true;
    });

    renderOffers();
    updateResultsCount();
  }

  // ============================================
  // フィルターリセット
  // ============================================
  function resetFilters() {
    state.searchQuery = '';
    state.prefectures = [];
    state.serviceTypes = [];
    state.selectedDate = '';

    elements.searchInput.value = '';
    
    // 地域ボタンをリセット
    elements.prefectureFilter.querySelectorAll('.pref-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    const allPrefBtn = elements.prefectureFilter.querySelector('[data-pref=""]');
    if (allPrefBtn) {
      allPrefBtn.classList.add('active');
    }
    
    // サービスボタンをリセット
    elements.serviceFilter.querySelectorAll('.service-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    const allServiceBtn = elements.serviceFilter.querySelector('[data-service=""]');
    if (allServiceBtn) {
      allServiceBtn.classList.add('active');
    }
    
    // 日付ボタンをリセット
    elements.dateFilter.querySelectorAll('.date-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    const allDateBtn = elements.dateFilter.querySelector('[data-date=""]');
    if (allDateBtn) {
      allDateBtn.classList.add('active');
    }

    applyFilters();
  }

  // ============================================
  // 支援情報カードの描画（フラット表示）
  // ============================================
  function renderOffers() {
    if (state.filteredOffers.length === 0) {
      elements.offersGrid.innerHTML = createNoResultsMessage();
      return;
    }

    // フラットなカードリストとして描画
    const html = state.filteredOffers.map(offer => createOfferCard(offer)).join('');
    elements.offersGrid.innerHTML = html;
    
    // ポップオーバーのイベントリスナーを設定
    setupPopoverListeners();
  }

  // ============================================
  // ポップオーバー制御
  // ============================================
  function setupPopoverListeners() {
    const infoButtons = document.querySelectorAll('.offer-info-btn');
    
    infoButtons.forEach(btn => {
      const popoverId = btn.dataset.popoverToggle;
      const popover = document.querySelector(`.offer-popover[data-popover="${popoverId}"]`);
      
      if (!popover) return;
      
      const closeBtn = popover.querySelector('.offer-popover-close');
      
      // ボタンクリックでポップオーバー表示/非表示
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const isActive = popover.classList.contains('active');
        
        // 他のポップオーバーを閉じる
        closeAllPopovers();
        
        // このポップオーバーを開く（既に開いていたら閉じたままにする）
        if (!isActive) {
          openPopover(btn, popover);
        }
      });
      
      // 閉じるボタン
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          closePopover(btn, popover);
        });
      }
      
      // ポップオーバー内クリックはバブリングを止める
      popover.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });
    
    // ポップオーバー外クリックで閉じる（一度だけ登録）
    document.removeEventListener('click', closeAllPopovers);
    document.addEventListener('click', closeAllPopovers);
  }
  
  function openPopover(btn, popover) {
    // 常に下方向に表示（z-indexで前面に出す）
    popover.classList.remove('position-top');
    
    btn.classList.add('active');
    popover.classList.add('active');
  }
  
  function closePopover(btn, popover) {
    btn.classList.remove('active');
    popover.classList.remove('active');
  }
  
  function closeAllPopovers() {
    document.querySelectorAll('.offer-popover.active').forEach(popover => {
      popover.classList.remove('active');
      const popoverId = popover.dataset.popover;
      const btn = document.querySelector(`.offer-info-btn[data-popover-toggle="${popoverId}"]`);
      if (btn) btn.classList.remove('active');
    });
  }

  // ============================================
  // サービス種類アイコンマッピング
  // ============================================
  const SERVICE_ICONS = {
    '炊き出し': '🍚',
    '食料配布': '🥡',
    '相談会': '💬',
    '電話相談': '📞',
    '宿泊支援': '🏠'
  };

  // ============================================
  // カードHTML生成
  // ============================================
  function createOfferCard(offer) {
    const hasPhone = offer.phone || offer.phoneAlt;
    const hasUrl = offer.url;
    const hasLocation = offer.location;
    const hasSource = offer.sourceText;

    // 地域表示
    const areaDisplay = offer.area 
      ? `${offer.prefecture}・${offer.area}` 
      : offer.prefecture;

    // サービス種類タグ
    const serviceTags = offer.serviceTypes.map(type => {
      const icon = SERVICE_ICONS[type] || '';
      return `<span class="offer-service-tag"><span class="service-btn-icon">${icon}</span>${escapeHtml(type)}</span>`;
    }).join('');

    // 電話番号をリンク化
    const phoneLink = hasPhone 
      ? `<a href="tel:${offer.phone.replace(/[^0-9#*+]/g, '')}" class="offer-phone-link">${escapeHtml(offer.phone)}</a>${offer.phoneAlt ? `<br><small>${escapeHtml(offer.phoneAlt)}</small>` : ''}`
      : '';

    // 団体名（URLがあればリンク化）
    const providerDisplay = hasUrl
      ? `<a href="${escapeHtml(offer.url)}" target="_blank" rel="noopener noreferrer" class="offer-provider-link">${escapeHtml(offer.providerName)}</a>`
      : `<span class="offer-provider">${escapeHtml(offer.providerName)}</span>`;

    // ポップオーバー（原文がある場合のみ）
    const infoButton = hasSource ? `
      <button type="button" class="offer-info-btn" data-popover-toggle="${offer.id}" aria-label="原文を表示">
        <i class="fa-solid fa-circle-info"></i>
      </button>
      <div class="offer-popover" data-popover="${offer.id}">
        <div class="offer-popover-header">
          <span class="offer-popover-title">原文</span>
          <button type="button" class="offer-popover-close" aria-label="閉じる">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="offer-popover-body">${escapeHtml(offer.sourceText)}</div>
      </div>
    ` : '';

    return `
      <article class="offer-card" data-offer-id="${offer.id}">
        <!-- サービス種類タグ -->
        <div class="offer-service-tags">${serviceTags}</div>
        
        <!-- カードヘッダー（サービス名 + 情報アイコン） -->
        <div class="offer-card-header">
          <h3 class="offer-service-name">${escapeHtml(offer.serviceName)}</h3>
          ${infoButton}
        </div>
        
        <!-- 団体名・地域はサブ情報 -->
        <div class="offer-sub-info">
          ${providerDisplay}
          <span class="offer-sub-separator">|</span>
          <span class="offer-area-tag">${escapeHtml(areaDisplay)}</span>
        </div>
        
        <!-- 詳細情報 -->
        <div class="offer-details">
          ${offer.schedule ? `
            <div class="offer-detail">
              <span class="offer-detail-icon">📅</span>
              <span class="offer-detail-text">${escapeHtml(offer.schedule)}</span>
            </div>
          ` : ''}
          
          ${hasLocation ? `
            <div class="offer-detail">
              <span class="offer-detail-icon">📍</span>
              <span class="offer-detail-text">${escapeHtml(offer.location)}<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(offer.location)}" target="_blank" rel="noopener noreferrer" class="map-link">（Googleマップで検索）</a></span>
            </div>
          ` : ''}
          
          ${hasPhone ? `
            <div class="offer-detail">
              <span class="offer-detail-icon">📞</span>
              <span class="offer-detail-text">${phoneLink}</span>
            </div>
          ` : ''}
          
          ${hasUrl ? `
            <div class="offer-detail">
              <span class="offer-detail-icon">🔗</span>
              <span class="offer-detail-text"><a href="${escapeHtml(offer.url)}" target="_blank" rel="noopener noreferrer" class="detail-link">詳細ページ</a></span>
            </div>
          ` : ''}
          
          ${offer.notes ? `
            <div class="offer-detail">
              <span class="offer-detail-icon"></span>
              <span class="offer-detail-text">${escapeHtml(offer.notes)}</span>
            </div>
          ` : ''}
        </div>
      </article>
    `;
  }


  // ============================================
  // 検索結果なしメッセージ
  // ============================================
  function createNoResultsMessage() {
    return `
      <div style="text-align: center; padding: 3rem; color: #6b7280;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
        <p style="font-size: 1.125rem; margin-bottom: 0.5rem;">該当する支援情報が見つかりませんでした</p>
        <p style="font-size: 0.875rem;">フィルター条件を変更してお試しください</p>
      </div>
    `;
  }

  // ============================================
  // 結果件数更新
  // ============================================
  function updateResultsCount() {
    elements.resultsCount.textContent = state.filteredOffers.length;
    updateFilterDisplay();
  }

  // ============================================
  // 検索条件表示更新
  // ============================================
  function updateFilterDisplay() {
    const parts = [];
    
    if (state.searchQuery) {
      parts.push(`「${state.searchQuery}」`);
    }
    if (state.prefectures.length > 0) {
      parts.push(state.prefectures.join('・'));
    }
    if (state.serviceTypes.length > 0) {
      parts.push(state.serviceTypes.join('・'));
    }
    if (state.selectedDate) {
      parts.push(formatDateForDisplay(state.selectedDate));
    }
    
    if (parts.length > 0) {
      elements.currentFilters.textContent = `（${parts.join(' / ')}）`;
    } else {
      elements.currentFilters.textContent = '';
    }
  }

  // ============================================
  // 日付表示用フォーマット
  // ============================================
  function formatDateForDisplay(dateStr) {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
    const dayName = dayNames[date.getDay()];
    return `${month}/${day}（${dayName}）`;
  }

  // ============================================
  // ユーティリティ関数
  // ============================================
  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ============================================
  // モーダル機能
  // ============================================
  function setupModal() {
    const aboutLink = document.getElementById('about-link');
    const modal = document.getElementById('about-modal');
    const modalClose = document.getElementById('modal-close');

    if (!aboutLink || !modal) return;

    // リンククリックでモーダルを開く
    aboutLink.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    // 閉じるボタンでモーダルを閉じる
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    // オーバーレイクリックでモーダルを閉じる
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // ESCキーでモーダルを閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ============================================
  // DOMContentLoaded時に初期化
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      init();
      setupModal();
    });
  } else {
    init();
    setupModal();
  }

})();
