import { Routes, Route, Link, useNavigate } from "react-router-dom";

import bannerImg from "./assets/banner.png";

import facebookIcon from "./assets/facebook.png";
import linkedinIcon from "./assets/LinkedIn.png";
import twitterIcon from "./assets/Twitter.png";

import writingIcon from "./assets/products/writing.png";
import designIcon from "./assets/products/design-tool.png";
import portfolioIcon from "./assets/products/portfolio.png";
import operationIcon from "./assets/products/operation.png";
import socialIcon from "./assets/products/social-media.png";

import React, { useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ShoppingCart,
  Play,
  PenTool,
  Palette,
  Camera,
  Bot,
  FileText,
  Megaphone,
  User,
  Package,
  Rocket,
  Check,
  Menu,
  X,
  Sparkles,
  Monitor,
  WandSparkles,
  FolderKanban,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "AI Writing Pro",
    description:
      "Generate high-quality content, blogs, and marketing copy in seconds with advanced AI.",
    price: 29,
    period: "monthly",
    tag: "Best Seller",
    tagType: "best seller",
    features: [
      "Unlimited AI generations",
      "50+ writing templates",
      "Grammar checker",
    ],
    icon: writingIcon,
  },
  {
    id: 2,
    name: "Design Templates Pack",
    description:
      "2000+ premium templates for social media, presentations, and marketing materials.",
    price: 49,
    period: "one-time",
    tag: "Popular",
    tagType: "popular",
    features: ["2000+ templates", "Monthly updates", "Commercial license"],
    icon: designIcon,
  },
  {
    id: 3,
    name: "Premium Stock Assets",
    description:
      "Access millions of royalty-free photos, videos, and graphics for your projects.",
    price: 19,
    period: "monthly",
    tag: "New",
    tagType: "new",
    features: ["10M+ assets", "Commercial use", "No attribution"],
    icon: Camera, // keep this one
  },
  {
    id: 4,
    name: "Automation Toolkit",
    description:
      "Automate repetitive tasks and streamline your workflow with powerful tools.",
    price: 79,
    period: "monthly",
    tag: "Popular",
    tagType: "popular",
    features: ["50+ automations", "API access", "Custom workflows"],
    icon: operationIcon,
  },
  {
    id: 5,
    name: "Resume Builder Pro",
    description:
      "Create professional resumes and cover letters that land interviews.",
    price: 15,
    period: "one-time",
    tag: "New",
    tagType: "new",
    features: ["100+ templates", "ATS optimization", "Export to PDF"],
    icon: portfolioIcon,
  },
  {
    id: 6,
    name: "Social Media Content Kit",
    description:
      "Complete toolkit for creating engaging social media content across all platforms.",
    price: 39,
    period: "monthly",
    tag: "Best Seller",
    tagType: "best seller",
    features: ["5000+ assets", "Scheduler included", "Analytics dashboard"],
    icon: socialIcon,
  },
];

const navLinks = ["Products", "Features", "Pricing", "Testimonials", "FAQ"];

function getTagClasses(tagType) {
  if (tagType === "best seller") return "bg-orange-100 text-orange-600";
  if (tagType === "popular") return "bg-violet-100 text-violet-600";
  return "bg-green-100 text-green-600";
}

function formatPeriod(period) {
  if (period === "one-time") return "/One-Time";
  if (period === "monthly") return "/Mo";
  return "/Year";
}

function ProductCard({ product, onAdd, added }) {
  const Icon = product.icon;
  const isImage = typeof Icon === "string";
  const navigate = useNavigate();

  const handleBuyNow = () => {
    onAdd(product);
    navigate("/cart");
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-violet-600">
          {isImage ? (
            <img src={Icon} alt="icon" className="h-6 w-6 object-contain" />
          ) : (
            <Icon size={22} />
          )}
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getTagClasses(
            product.tagType
          )}`}
        >
          {product.tag}
        </span>
      </div>

      <h3 className="mb-3 text-xl font-semibold text-slate-900">
        {product.name}
      </h3>

      <p className="mb-4 text-sm leading-6 text-slate-500">
        {product.description}
      </p>

      <div className="mb-4 flex items-end gap-1">
        <span className="text-3xl font-bold text-slate-900">
          ${product.price}
        </span>
        <span className="pb-1 text-sm text-slate-500">
          {formatPeriod(product.period)}
        </span>
      </div>

      <ul className="mb-6 space-y-2">
        {product.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2 text-sm text-slate-500"
          >
            <Check size={16} className="text-green-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleBuyNow}
        className="w-full rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
      >
        {added ? "Added to cart" : "Buy Now"}
      </button>
    </div>
  );
}

function CartItem({ item, onRemove }) {
  const Icon = item.icon;
  const isImage = typeof Icon === "string";

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-violet-600 shadow-sm">
          {isImage ? (
            <img src={Icon} alt="icon" className="h-6 w-6 object-contain" />
          ) : (
            <Icon size={20} />
          )}
        </div>

        <div>
          <h4 className="font-semibold text-slate-900">{item.name}</h4>
          <p className="mt-1 text-sm text-slate-500">${item.price}</p>
        </div>
      </div>

      <button
        onClick={onRemove}
        className="text-sm font-medium text-pink-600 transition hover:text-pink-700"
      >
        Remove
      </button>
    </div>
  );
}

function HeroArtwork() {
  return (
    <div className="flex justify-center lg:justify-end">
      <img
        src={bannerImg}
        alt="Banner"
        className="w-full max-w-md rounded-2xl shadow-sm lg:max-w-lg"
      />
    </div>
  );
}

function HomePage({ cartItems, addedMap, handleAddToCart, mobileOpen, setMobileOpen }) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="text-2xl font-extrabold text-violet-600">
            DigiTools
          </div>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-slate-700 transition hover:text-violet-600"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <Link
              to="/cart"
              className="flex items-center gap-2 text-sm text-slate-700"
            >
              <ShoppingCart size={16} />
              <span>{cartItems.length}</span>
            </Link>
            <button className="text-sm text-slate-700">Login</button>
            <button className="rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white">
              Get Started
            </button>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a key={link} href="#" className="text-sm text-slate-700">
                  {link}
                </a>
              ))}
              <Link to="/cart" className="flex items-center gap-2 text-sm text-slate-700">
                <ShoppingCart size={16} />
                <span>Cart ({cartItems.length})</span>
              </Link>
              <button className="text-left text-sm text-slate-700">
                Login
              </button>
              <button className="rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white">
                Get Started
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-600">
              <Sparkles size={14} />
              New: AI-Powered Tools Available
            </div>

            <h1 className="max-w-xl text-5xl font-extrabold leading-tight text-slate-900 md:text-6xl lg:text-[64px] lg:leading-[1.05]">
              Supercharge Your Digital Workflow
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-500">
              Access premium AI tools, design assets, templates, and productivity
              software all in one place. Start creating faster today.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button className="rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white">
                Explore Products
              </button>
              <button className="flex items-center gap-2 rounded-full border border-violet-300 px-6 py-3 text-sm font-semibold text-violet-600">
                <Play size={16} />
                Watch Demo
              </button>
            </div>
          </div>

          <HeroArtwork />
        </section>

        <section className="bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 text-center text-white sm:grid-cols-3 sm:px-6 lg:px-8">
            <div>
              <div className="text-5xl font-extrabold">50K+</div>
              <div className="mt-2 text-lg text-violet-100">Active Users</div>
            </div>
            <div className="sm:border-x sm:border-white/20">
              <div className="text-5xl font-extrabold">200+</div>
              <div className="mt-2 text-lg text-violet-100">Premium Tools</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold">4.9</div>
              <div className="mt-2 text-lg text-violet-100">Rating</div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
              Premium Digital Tools
            </h2>
            <p className="mt-4 text-slate-500">
              Choose from our curated collection of premium digital products
              designed to boost your productivity and creativity.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={handleAddToCart}
                added={Boolean(addedMap[product.id])}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

function CartPage({ cartItems, total, handleRemoveItem, handleCheckout }) {
  return (
    <main className="min-h-screen bg-[#f7f7f8] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
          Premium Digital Tools
        </h2>
        <p className="mt-4 text-slate-500">
          Choose from our curated collection of premium digital products designed
          to boost your productivity and creativity.
        </p>

        <div className="mt-6 inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
          <Link
            to="/"
            className="rounded-full px-6 py-3 text-sm font-semibold text-slate-700"
          >
            Products
          </Link>
          <button className="rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow">
            Cart ({cartItems.length})
          </button>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h3 className="text-3xl font-bold text-slate-900">Your Cart</h3>

        {cartItems.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-slate-50 p-10 text-center text-slate-500">
            Your cart is empty
          </div>
        ) : (
          <>
            <div className="mt-8 space-y-4">
              {cartItems.map((item, index) => (
                <CartItem
                  key={`${item.id}-${index}`}
                  item={item}
                  onRemove={() => handleRemoveItem(index)}
                />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between text-slate-500">
              <span>Total:</span>
              <span className="text-3xl font-bold text-slate-900">${total}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-6 w-full rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 px-6 py-4 text-sm font-semibold text-white"
            >
              Proceed To Checkout
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [addedMap, setAddedMap] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price, 0);
  }, [cartItems]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    toast.success(`${product.name} added to cart`);
  };

  const handleRemoveItem = (index) => {
    const item = cartItems[index];
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);

    if (item) {
      const stillExists = updatedCart.some(
        (cartItem) => cartItem.id === item.id
      );

      if (!stillExists) {
        setAddedMap((prev) => {
          const updated = { ...prev };
          delete updated[item.id];
          return updated;
        });
      }

      toast.info(`${item.name} removed from cart`);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setCartItems([]);
    setAddedMap({});
    toast.success("Proceed to checkout completed");
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-slate-900">
      <ToastContainer position="top-right" autoClose={1800} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                  <div className="text-2xl font-extrabold text-violet-600">
                    DigiTools
                  </div>

                  <nav className="hidden items-center gap-8 lg:flex">
                    {navLinks.map((link) => (
                      <a
                        key={link}
                        href="#"
                        className="text-sm text-slate-700 transition hover:text-violet-600"
                      >
                        {link}
                      </a>
                    ))}
                  </nav>

                  <div className="hidden items-center gap-5 lg:flex">
                    <Link
                      to="/cart"
                      className="relative flex items-center gap-2 text-sm text-slate-700"
                    >
                      <ShoppingCart size={16} />
                      {cartItems.length > 0 && (
                        <span className="absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white">
                          {cartItems.length}
                        </span>
                      )}
                    </Link>
                    <button className="text-sm text-slate-700">Login</button>
                    <button className="rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white">
                      Get Started
                    </button>
                  </div>

                  <button
                    className="lg:hidden"
                    onClick={() => setMobileOpen((v) => !v)}
                  >
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                  </button>
                </div>

                {mobileOpen && (
                  <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
                    <div className="flex flex-col gap-4">
                      {navLinks.map((link) => (
                        <a
                          key={link}
                          href="#"
                          className="text-sm text-slate-700"
                        >
                          {link}
                        </a>
                      ))}
                      <Link
                        to="/cart"
                        className="flex items-center gap-2 text-sm text-slate-700"
                      >
                        <ShoppingCart size={16} />
                        <span>Cart ({cartItems.length})</span>
                      </Link>
                      <button className="text-left text-sm text-slate-700">
                        Login
                      </button>
                      <button className="rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white">
                        Get Started
                      </button>
                    </div>
                  </div>
                )}
              </header>

              <main>
                <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-20">
                  <div>
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-600">
                      <Sparkles size={14} />
                      New: AI-Powered Tools Available
                    </div>

                    <h1 className="max-w-xl text-5xl font-extrabold leading-tight text-slate-900 md:text-6xl lg:text-[64px] lg:leading-[1.05]">
                      Supercharge Your Digital Workflow
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-8 text-slate-500">
                      Access premium AI tools, design assets, templates, and
                      productivity software all in one place. Start creating
                      faster today.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <button className="rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white">
                        Explore Products
                      </button>
                      <button className="flex items-center gap-2 rounded-full border border-violet-300 px-6 py-3 text-sm font-semibold text-violet-600">
                        <Play size={16} />
                        Watch Demo
                      </button>
                    </div>
                  </div>

                  <HeroArtwork />
                </section>

                <section className="bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600">
                  <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 text-center text-white sm:grid-cols-3 sm:px-6 lg:px-8">
                    <div>
                      <div className="text-5xl font-extrabold">50K+</div>
                      <div className="mt-2 text-lg text-violet-100">
                        Active Users
                      </div>
                    </div>
                    <div className="sm:border-x sm:border-white/20">
                      <div className="text-5xl font-extrabold">200+</div>
                      <div className="mt-2 text-lg text-violet-100">
                        Premium Tools
                      </div>
                    </div>
                    <div>
                      <div className="text-5xl font-extrabold">4.9</div>
                      <div className="mt-2 text-lg text-violet-100">Rating</div>
                    </div>
                  </div>
                </section>

                <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                  <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
                      Premium Digital Tools
                    </h2>
                    <p className="mt-4 text-slate-500">
                      Choose from our curated collection of premium digital
                      products designed to boost your productivity and
                      creativity.
                    </p>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm">
                      <button className="rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 px-8 py-3 text-sm font-semibold text-white shadow">
                        Products
                      </button>

                      <Link
                        to="/cart"
                        className="rounded-full px-8 py-3 text-sm font-semibold text-slate-700"
                      >
                        Cart ({cartItems.length})
                      </Link>
                    </div>
                  </div>

                  <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAdd={handleAddToCart}
                        added={Boolean(addedMap[product.id])}
                      />
                    ))}
                  </div>
                </section>

                <section className="bg-white py-20">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                      <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
                        Get Started In 3 Steps
                      </h2>
                      <p className="mt-4 text-slate-500">
                        Start using premium digital tools in minutes, not hours.
                      </p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                      {[
                        {
                          number: "01",
                          title: "Create Account",
                          text: "Sign up for free in seconds. No credit card required to get started.",
                          icon: User,
                        },
                        {
                          number: "02",
                          title: "Choose Products",
                          text: "Browse our catalog and select the tools that fit your needs.",
                          icon: Package,
                        },
                        {
                          number: "03",
                          title: "Start Creating",
                          text: "Download and start using your premium tools immediately.",
                          icon: Rocket,
                        },
                      ].map((step) => {
                        const Icon = step.icon;
                        return (
                          <div
                            key={step.number}
                            className="relative rounded-2xl border border-slate-200 bg-[#fcfcfd] p-8 text-center shadow-sm"
                          >
                            <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white">
                              {step.number}
                            </div>
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                              <Icon size={34} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">
                              {step.title}
                            </h3>
                            <p className="mt-4 text-slate-500">{step.text}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>

                <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                  <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
                      Simple, Transparent Pricing
                    </h2>
                    <p className="mt-4 text-slate-500">
                      Choose the plan that fits your needs. Upgrade or
                      downgrade anytime.
                    </p>
                  </div>

                  <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                      <h3 className="text-3xl font-bold text-slate-900">
                        Starter
                      </h3>
                      <p className="mt-2 text-slate-500">
                        Perfect for getting started
                      </p>
                      <div className="mt-6 text-5xl font-extrabold text-slate-900">
                        $0
                        <span className="text-xl font-medium text-slate-500">
                          /Month
                        </span>
                      </div>
                      <ul className="mt-8 space-y-3 text-slate-500">
                        {[
                          "Access to 10 free tools",
                          "Basic templates",
                          "Community support",
                          "1 project per month",
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <Check size={18} className="text-green-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <button className="mt-10 w-full rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 px-6 py-4 text-sm font-semibold text-white">
                        Get Started Free
                      </button>
                    </div>

                    <div className="relative rounded-2xl bg-gradient-to-br from-blue-600 via-violet-600 to-fuchsia-600 p-8 text-white shadow-xl">
                      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-200 px-4 py-2 text-sm font-semibold text-orange-700">
                        Most Popular
                      </div>
                      <h3 className="text-3xl font-bold">Pro</h3>
                      <p className="mt-2 text-violet-100">
                        Best for professionals
                      </p>
                      <div className="mt-6 text-5xl font-extrabold">
                        $29
                        <span className="text-xl font-medium text-violet-100">
                          /Month
                        </span>
                      </div>
                      <ul className="mt-8 space-y-3 text-violet-50">
                        {[
                          "Access to all premium tools",
                          "Unlimited templates",
                          "Priority support",
                          "Unlimited projects",
                          "Cloud sync",
                          "Advanced analytics",
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <Check size={18} className="text-white" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <button className="mt-10 w-full rounded-full bg-white px-6 py-4 text-sm font-semibold text-violet-600">
                        Start Pro Trial
                      </button>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                      <h3 className="text-3xl font-bold text-slate-900">
                        Enterprise
                      </h3>
                      <p className="mt-2 text-slate-500">
                        For teams and businesses
                      </p>
                      <div className="mt-6 text-5xl font-extrabold text-slate-900">
                        $99
                        <span className="text-xl font-medium text-slate-500">
                          /Month
                        </span>
                      </div>
                      <ul className="mt-8 space-y-3 text-slate-500">
                        {[
                          "Everything in Pro",
                          "Team collaboration",
                          "Custom integrations",
                          "Dedicated support",
                          "SLA guarantee",
                          "Custom branding",
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <Check size={18} className="text-green-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <button className="mt-10 w-full rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 px-6 py-4 text-sm font-semibold text-white">
                        Contact Sales
                      </button>
                    </div>
                  </div>
                </section>

                <section className="bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 py-20 text-white">
                  <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
                    <div className="rounded-2xl border border-dashed border-white/20 px-6 py-10">
                      <h2 className="text-4xl font-extrabold sm:text-5xl">
                        Ready To Transform Your Workflow?
                      </h2>
                      <p className="mx-auto mt-5 max-w-3xl text-lg text-violet-100">
                        Join thousands of professionals who are already using
                        Digitools to work smarter. Start your free trial today.
                      </p>
                    </div>

                    <div className="mt-7 rounded-2xl border border-dashed border-white/20 px-6 py-8">
                      <div className="flex flex-wrap items-center justify-center gap-4">
                        <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-violet-600">
                          Explore Products
                        </button>
                        <button className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white">
                          View Pricing
                        </button>
                      </div>
                      <p className="mt-6 text-sm text-violet-100">
                        14-day free trial • No credit card required • Cancel
                        anytime
                      </p>
                    </div>
                  </div>
                </section>
              </main>

              <footer className="bg-[#07142d] text-white">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
                  <div className="lg:col-span-1">
                    <h3 className="text-4xl font-extrabold">DigiTools</h3>
                    <p className="mt-5 max-w-xs text-slate-300">
                      Premium digital tools for creators, professionals, and
                      businesses. Work smarter with our suite of powerful tools.
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-5 text-xl font-semibold">Product</h4>
                    <ul className="space-y-3 text-slate-300">
                      <li>Features</li>
                      <li>Pricing</li>
                      <li>Templates</li>
                      <li>Integrations</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-5 text-xl font-semibold">Company</h4>
                    <ul className="space-y-3 text-slate-300">
                      <li>About</li>
                      <li>Blog</li>
                      <li>Careers</li>
                      <li>Press</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-5 text-xl font-semibold">Resources</h4>
                    <ul className="space-y-3 text-slate-300">
                      <li>Documentation</li>
                      <li>Help Center</li>
                      <li>Community</li>
                      <li>Contact</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-5 text-xl font-semibold text-white">
                      Social Links
                    </h4>

                    <div className="flex gap-3">
                      <a
                        href="#"
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white"
                      >
                        <img
                          src={facebookIcon}
                          alt="Facebook"
                          className="h-5 w-5 object-contain"
                        />
                      </a>

                      <a
                        href="#"
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white"
                      >
                        <img
                          src={linkedinIcon}
                          alt="LinkedIn"
                          className="h-5 w-5 object-contain"
                        />
                      </a>

                      <a
                        href="#"
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white"
                      >
                        <img
                          src={twitterIcon}
                          alt="Twitter"
                          className="h-5 w-5 object-contain"
                        />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/10 px-4 py-6 text-sm text-slate-400 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
                  <p>© 2026 Digitools. All rights reserved.</p>
                  <div className="flex flex-wrap gap-6">
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                    <span>Cookies</span>
                  </div>
                </div>
              </footer>
            </>
          }
        />

        <Route
          path="/cart"
          element={
            <main className="min-h-screen bg-[#f7f7f8] px-4 py-16 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
                  Premium Digital Tools
                </h2>
                <p className="mt-4 text-slate-500">
                  Choose from our curated collection of premium digital products
                  designed to boost your productivity and creativity.
                </p>

                <div className="mt-6 flex justify-center">
                  <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm">
                    <Link
                      to="/"
                      className="rounded-full px-8 py-3 text-sm font-semibold text-slate-700"
                    >
                      Products
                    </Link>

                    <button className="rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 px-8 py-3 text-sm font-semibold text-white shadow">
                      Cart ({cartItems.length})
                    </button>
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h3 className="text-3xl font-bold text-slate-900">
                  Your Cart
                </h3>

                {cartItems.length === 0 ? (
                  <div className="mt-8 rounded-2xl bg-slate-50 p-10 text-center text-slate-500">
                    Your cart is empty
                  </div>
                ) : (
                  <>
                    <div className="mt-8 space-y-4">
                      {cartItems.map((item, index) => (
                        <CartItem
                          key={`${item.id}-${index}`}
                          item={item}
                          onRemove={() => handleRemoveItem(index)}
                        />
                      ))}
                    </div>

                    <div className="mt-8 flex items-center justify-between text-slate-500">
                      <span>Total:</span>
                      <span className="text-3xl font-bold text-slate-900">
                        ${total}
                      </span>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="mt-6 w-full rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 px-6 py-4 text-sm font-semibold text-white"
                    >
                      Proceed To Checkout
                    </button>
                  </>
                )}
              </div>
            </main>
          }
        />
      </Routes>
    </div>
  );
}