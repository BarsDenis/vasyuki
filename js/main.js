document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.marquee__track').forEach(track => {
    const list = track.querySelector('.marquee__list');
    const clone = list.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  new Swiper('.stages__slider', {
    slidesPerView: 1,
    spaceBetween: 12,
    pagination: {
      el: '.stages__pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.stages__button-next',
      prevEl: '.stages__button-prev',
    },
    breakpoints: {
      1024: {
        enabled: false,
      }
    }
  });

  let participantsTotal = 0;

  new Swiper('.participants__slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.participants__pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.participants__button-next',
      prevEl: '.participants__button-prev',
    },
    breakpoints: {
      900: { slidesPerView: 2, spaceBetween: 12 },
      1350: { slidesPerView: 3, spaceBetween: 20 },
    },
    on: {
      init(swiper) {
        participantsTotal = [...swiper.slides].filter(
          s => !s.classList.contains('swiper-slide-duplicate')
        ).length;
        swiper.pagination.el.querySelector('.swiper-pagination-current').textContent = swiper.realIndex + 1;
        swiper.pagination.el.querySelector('.swiper-pagination-total').textContent = participantsTotal;
      },
      realIndexChange(swiper) {
        swiper.pagination.el.querySelector('.swiper-pagination-current').textContent = swiper.realIndex + 1;
        swiper.pagination.el.querySelector('.swiper-pagination-total').textContent = participantsTotal;
      },
    },
  });
});
