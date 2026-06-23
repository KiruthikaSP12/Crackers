import { store } from "../data/store.js";
import { createRazorpayOrder, isRazorpayConfigured, verifyRazorpaySignature } from "../utils/razorpay.js";
import { buildAppOrder } from "./orderController.js";

export const getPayments = (_req, res) => {
  res.json(store.payments);
};

export const getPaymentConfig = (_req, res) => {
  res.json({
    enabled: isRazorpayConfigured(),
    keyId: process.env.RAZORPAY_KEY_ID || ""
  });
};

export const createRazorpayOrderEndpoint = async (req, res) => {
  if (!isRazorpayConfigured()) {
    return res.status(503).json({ message: "Online payment is not configured yet." });
  }

  try {
    const amount = Number(req.body.amount);
    const receipt = req.body.receipt || `receipt_${Date.now()}`;
    const order = await createRazorpayOrder({
      amount,
      receipt,
      notes: req.body.notes || {}
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to create Razorpay order." });
  }
};

export const verifyRazorpayPayment = (req, res) => {
  const {
    razorpay_order_id: razorpayOrderId,
    razorpay_payment_id: razorpayPaymentId,
    razorpay_signature: razorpaySignature,
    orderPayload
  } = req.body;

  if (!isRazorpayConfigured()) {
    return res.status(503).json({ message: "Online payment is not configured yet." });
  }

  const isValid = verifyRazorpaySignature({
    orderId: razorpayOrderId,
    paymentId: razorpayPaymentId,
    signature: razorpaySignature
  });

  if (!isValid) {
    return res.status(400).json({ message: "Invalid payment signature." });
  }

  const payment = {
    id: Date.now(),
    userId: orderPayload.userId,
    gateway: "Razorpay",
    orderId: razorpayOrderId,
    paymentId: razorpayPaymentId,
    method: orderPayload.paymentMethod || "UPI",
    status: "Paid",
    amount: orderPayload.total
  };

  const appOrder = buildAppOrder({
    ...orderPayload,
    paymentStatus: "Paid"
  });

  store.payments.push(payment);
  store.orders.push(appOrder);
  store.cart = [];

  res.json({
    message: "Payment verified and order placed successfully.",
    payment,
    order: appOrder
  });
};

export const recordPayment = (req, res) => {
  const payment = { id: Date.now(), ...req.body };
  store.payments.push(payment);
  res.status(201).json({ message: "Payment recorded.", payment });
};
