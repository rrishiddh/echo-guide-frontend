A8

echo-guide-frontend/
│
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── components.json               
├── .env.local
├── .env.example
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── README.md
│
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── logo-dark.svg
│   │   ├── user-placeholder.png
│   │   ├── guide-placeholder.png
│   │   ├── banner/
│   │   │   ├── home-hero.jpg
│   │   │   ├── become-guide.jpg
│   │   │   └── explore-tours.jpg
│   │   ├── categories/
│   │   │   ├── food.jpg
│   │   │   ├── adventure.jpg
│   │   │   ├── history.jpg
│   │   │   └── culture.jpg
│   │   └── testimonials/
│   ├── icons/
│   │   ├── favicon.ico
│   │   ├── apple-touch-icon.png
│   │   └── manifest.json
│   └── fonts/                     
│
└── src/
    │
    ├── app/                        
    │   ├── layout.tsx             
    │   ├── page.tsx               
    │   ├── globals.css            
    │   ├── loading.tsx            
    │   ├── error.tsx             
    │   ├── not-found.tsx          
    │   │
    │   ├── (auth)/                 
    │   │   ├── layout.tsx         
    │   │   ├── login/
    │   │   │   └── page.tsx
    │   │   ├── register/
    │   │   │   └── page.tsx
    │   │   ├── forgot-password/
    │   │   │   └── page.tsx
    │   │   └── reset-password/
    │   │       └── page.tsx
    │   │
    │   ├── (public)/              
    │   │   ├── about/
    │   │   │   └── page.tsx
    │   │   ├── contact/
    │   │   │   └── page.tsx
    │   │   ├── how-it-works/
    │   │   │   └── page.tsx
    │   │   ├── become-guide/
    │   │   │   └── page.tsx
    │   │   └── faq/
    │   │       └── page.tsx
    │   │
    │   ├── listings/               
    │   │   ├── page.tsx          
    │   │   ├── [id]/
    │   │   │   ├── page.tsx        
    │   │   │   └── loading.tsx
    │   │   └── search/
    │   │       └── page.tsx        
    │   │
    │   ├── guides/                 
    │   │   ├── page.tsx            
    │   │   └── [id]/
    │   │       └── page.tsx     
    │   │
    │   ├── bookings/             
    │   │   ├── page.tsx            
    │   │   ├── [id]/
    │   │   │   └── page.tsx       
    │   │   └── create/
    │   │       └── page.tsx        
    │   │
    │   ├── reviews/                
    │   │   └── [bookingId]/
    │   │       └── page.tsx       
    │   │
    │   ├── payments/               
    │   │   ├── checkout/
    │   │   │   └── page.tsx        
    │   │   ├── success/
    │   │   │   └── page.tsx
    │   │   ├── cancel/
    │   │   │   └── page.tsx
    │   │   └── failed/
    │   │       └── page.tsx
    │   │
    │   ├── profile/                
    │   │   ├── page.tsx           
    │   │   ├── settings/
    │   │   │   └── page.tsx
    │   │   ├── change-password/
    │   │   │   └── page.tsx
    │   │   └── preferences/
    │   │       └── page.tsx
    │   │
    │   ├── dashboard/              
    │   │   ├── layout.tsx          
    │   │   ├── page.tsx            
    │   │   │
    │   │   ├── tourist/           
    │   │   │   ├── page.tsx        
    │   │   │   ├── bookings/
    │   │   │   │   └── page.tsx
    │   │   │   ├── reviews/
    │   │   │   │   └── page.tsx
    │   │   │   └── wishlist/
    │   │   │       └── page.tsx
    │   │   │
    │   │   ├── guide/             
    │   │   │   ├── page.tsx        
    │   │   │   ├── listings/
    │   │   │   │   ├── page.tsx
    │   │   │   │   ├── create/
    │   │   │   │   │   └── page.tsx
    │   │   │   │   └── [id]/
    │   │   │   │       └── edit/
    │   │   │   │           └── page.tsx
    │   │   │   ├── bookings/
    │   │   │   │   └── page.tsx
    │   │   │   ├── earnings/
    │   │   │   │   └── page.tsx
    │   │   │   ├── reviews/
    │   │   │   │   └── page.tsx
    │   │   │   └── analytics/
    │   │   │       └── page.tsx
    │   │   │
    │   │   └── admin/           
    │   │       ├── page.tsx       
    │   │       ├── users/
    │   │       │   ├── page.tsx
    │   │       │   └── [id]/
    │   │       │       └── page.tsx
    │   │       ├── guides/
    │   │       │   └── page.tsx
    │   │       ├── listings/
    │   │       │   ├── page.tsx
    │   │       │   └── [id]/
    │   │       │       └── page.tsx
    │   │       ├── bookings/
    │   │       │   ├── page.tsx
    │   │       │   └── [id]/
    │   │       │       └── page.tsx
    │   │       ├── payments/
    │   │       │   └── page.tsx
    │   │       ├── reviews/
    │   │       │   └── page.tsx
    │   │       ├── analytics/
    │   │       │   └── page.tsx
    │   │       ├── reports/
    │   │       │   └── page.tsx
    │   │       └── settings/
    │   │           └── page.tsx
    │   │
    │   └── api/                    
    │       └── webhook/
    │           └── route.ts       
    │
    ├── components/               
    │   │
    │   ├── ui/                    
    │   │   ├── button.tsx
    │   │   ├── input.tsx
    │   │   ├── card.tsx
    │   │   ├── dialog.tsx
    │   │   ├── dropdown-menu.tsx
    │   │   ├── select.tsx
    │   │   ├── table.tsx
    │   │   ├── tabs.tsx
    │   │   ├── badge.tsx
    │   │   ├── avatar.tsx
    │   │   ├── skeleton.tsx
    │   │   ├── toast.tsx
    │   │   ├── tooltip.tsx
    │   │   ├── alert.tsx
    │   │   ├── calendar.tsx
    │   │   ├── slider.tsx
    │   │   ├── switch.tsx
    │   │   ├── checkbox.tsx
    │   │   ├── radio-group.tsx
    │   │   ├── textarea.tsx
    │   │   ├── separator.tsx
    │   │   ├── progress.tsx
    │   │   └── form.tsx
    │   │
    │   ├── layout/             
    │   │   ├── Navbar.tsx
    │   │   ├── Footer.tsx
    │   │   ├── Sidebar.tsx
    │   │   ├── DashboardSidebar.tsx
    │   │   ├── MobileNav.tsx
    │   │   ├── Container.tsx
    │   │   └── Section.tsx
    │   │
    │   ├── common/                
    │   │   ├── ProtectedRoute.tsx
    │   │   ├── LoadingSpinner.tsx
    │   │   ├── LoadingScreen.tsx
    │   │   ├── ErrorBoundary.tsx
    │   │   ├── PageHeader.tsx
    │   │   ├── PageTitle.tsx
    │   │   ├── Breadcrumbs.tsx
    │   │   ├── SearchBar.tsx
    │   │   ├── Pagination.tsx
    │   │   ├── EmptyState.tsx
    │   │   ├── ConfirmDialog.tsx
    │   │   ├── ImageUploader.tsx
    │   │   ├── Rating.tsx
    │   │   ├── ShareButton.tsx
    │   │   ├── CopyToClipboard.tsx
    │   │   └── BackButton.tsx
    │   │
    │   ├── forms/                  
    │   │   ├── LoginForm.tsx
    │   │   ├── RegisterForm.tsx
    │   │   ├── ForgotPasswordForm.tsx
    │   │   ├── ResetPasswordForm.tsx
    │   │   ├── ProfileForm.tsx
    │   │   ├── ListingForm.tsx
    │   │   ├── BookingForm.tsx
    │   │   ├── ReviewForm.tsx
    │   │   ├── ChangePasswordForm.tsx
    │   │   └── FilterForm.tsx
    │   │
    │   ├── cards/               
    │   │   ├── ListingCard.tsx
    │   │   ├── GuideCard.tsx
    │   │   ├── BookingCard.tsx
    │   │   ├── ReviewCard.tsx
    │   │   ├── StatCard.tsx
    │   │   ├── FeatureCard.tsx
    │   │   ├── TestimonialCard.tsx
    │   │   └── CategoryCard.tsx
    │   │
    │   ├── listings/               
    │   │   ├── ListingGrid.tsx
    │   │   ├── ListingList.tsx
    │   │   ├── ListingDetail.tsx
    │   │   ├── ListingGallery.tsx
    │   │   ├── ListingInfo.tsx
    │   │   ├── ListingReviews.tsx
    │   │   ├── ListingFilters.tsx
    │   │   ├── ListingSidebar.tsx
    │   │   ├── FeaturedListings.tsx
    │   │   ├── PopularListings.tsx
    │   │   └── RecentListings.tsx
    │   │
    │   ├── bookings/               
    │   │   ├── BookingList.tsx
    │   │   ├── BookingDetail.tsx
    │   │   ├── BookingStatus.tsx
    │   │   ├── BookingSummary.tsx
    │   │   ├── UpcomingBookings.tsx
    │   │   ├── PastBookings.tsx
    │   │   └── BookingTimeline.tsx
    │   │
    │   ├── users/                 
    │   │   ├── UserProfile.tsx
    │   │   ├── UserAvatar.tsx
    │   │   ├── UserCard.tsx
    │   │   ├── UserList.tsx
    │   │   ├── GuideProfile.tsx
    │   │   ├── GuideList.tsx
    │   │   └── GuideStats.tsx
    │   │
    │   ├── reviews/              
    │   │   ├── ReviewList.tsx
    │   │   ├── ReviewItem.tsx
    │   │   ├── ReviewStats.tsx
    │   │   ├── RatingBreakdown.tsx
    │   │   ├── ReviewFilters.tsx
    │   │   └── LeaveReview.tsx
    │   │
    │   ├── payments/              
    │   │   ├── CheckoutForm.tsx
    │   │   ├── PaymentSummary.tsx
    │   │   ├── PaymentHistory.tsx
    │   │   ├── StripeCheckout.tsx
    │   │   ├── PriceBreakdown.tsx
    │   │   └── RefundRequest.tsx
    │   │
    │   ├── dashboard/              
    │   │   ├── StatsGrid.tsx
    │   │   ├── RevenueChart.tsx
    │   │   ├── BookingChart.tsx
    │   │   ├── ActivityFeed.tsx
    │   │   ├── QuickActions.tsx
    │   │   ├── RecentActivity.tsx
    │   │   └── AnalyticsCard.tsx
    │   │
    │   ├── home/                   
    │   │   ├── HeroSection.tsx
    │   │   ├── FeaturedGuides.tsx
    │   │   ├── PopularCategories.tsx
    │   │   ├── HowItWorks.tsx
    │   │   ├── Testimonials.tsx
    │   │   ├── BecomeGuide.tsx
    │   │   ├── WhyChooseUs.tsx
    │   │   └── CTASection.tsx
    │   │
    │   └── animations/             
    │       ├── FadeIn.tsx
    │       ├── SlideIn.tsx
    │       ├── ScaleIn.tsx
    │       ├── StaggerChildren.tsx
    │       ├── PageTransition.tsx
    │       └── AnimatedCounter.tsx
    │
    ├── hooks/                  
    │   ├── useAuth.ts
    │   ├── useUser.ts
    │   ├── useUserRole.ts
    │   ├── useListings.ts
    │   ├── useListingFilters.ts
    │   ├── useBookings.ts
    │   ├── useReviews.ts
    │   ├── usePayments.ts
    │   ├── useUpload.ts
    │   ├── useCloudinary.ts
    │   ├── useDebounce.ts
    │   ├── usePagination.ts
    │   ├── useToast.ts
    │   ├── useMediaQuery.ts
    │   ├── useLocalStorage.ts
    │   ├── useClickOutside.ts
    │   ├── useIntersectionObserver.ts
    │   └── useScrollPosition.ts
    │
    ├── lib/                       
    │   ├── axios.ts                
    │   ├── stripe.ts               
    │   ├── cloudinary.ts           
    │   ├── auth.ts                
    │   ├── api.ts                  
    │   ├── queryClient.ts          
    │   └── utils.ts            
    │
    ├── services/                 
    │   ├── api.service.ts          
    │   ├── auth.service.ts
    │   ├── user.service.ts
    │   ├── listing.service.ts
    │   ├── booking.service.ts
    │   ├── review.service.ts
    │   ├── payment.service.ts
    │   ├── admin.service.ts
    │   └── upload.service.ts
    │
    ├── store/                     
    │   ├── index.ts                
    │   ├── provider.tsx           
    │   └── slices/
    │       ├── authSlice.ts
    │       ├── userSlice.ts
    │       ├── listingSlice.ts
    │       ├── bookingSlice.ts
    │       ├── cartSlice.ts
    │       └── uiSlice.ts
    │
    ├── types/                     
    │   ├── index.d.ts
    │   ├── auth.d.ts
    │   ├── user.d.ts
    │   ├── listing.d.ts
    │   ├── booking.d.ts
    │   ├── payment.d.ts
    │   ├── review.d.ts
    │   ├── api.d.ts
    │   └── common.d.ts
    │
    ├── utils/                      
    │   ├── formatDate.ts
    │   ├── formatPrice.ts
    │   ├── formatTime.ts
    │   ├── validators.ts
    │   ├── localStorage.ts
    │   ├── sessionStorage.ts
    │   ├── cookies.ts
    │   ├── helpers.ts
    │   ├── errors.ts
    │   ├── constants.ts
    │   └── calculations.ts
    │
    ├── middleware/                 
    │   ├── authGuard.ts
    │   ├── roleGuard.ts
    │   └── redirects.ts
    │
    ├── styles/                    
    │   ├── globals.css
    │   ├── variables.css
    │   ├── animations.css
    │   └── utilities.css
    │
    ├── constants/               
    │   ├── index.ts
    │   ├── roles.ts
    │   ├── categories.ts
    │   ├── bookingStatus.ts
    │   ├── paymentStatus.ts
    │   ├── apiEndpoints.ts
    │   ├── routes.ts
    │   ├── config.ts
    │   └── messages.ts
    │
    └── config/                   
        ├── site.ts                 
        ├── navigation.ts           
        └── seo.ts                 