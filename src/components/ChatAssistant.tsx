import { useRef, useState } from "react";
import { AutoAwesomeRounded, Close, ForumRounded, SendRounded, SmartToyRounded, VerifiedRounded } from "@mui/icons-material";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

type Message = { role: "assistant" | "user"; text: string };

const starterMessages: Message[] = [{ role: "assistant", text: "Hello. I can help you find services, fees, quotes, contact details and careers information on this website." }];
const quickQuestions = ["How do I get a quote?", "What services do you offer?", "How do I contact you?"];

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(starterMessages);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const startedAt = useRef(Date.now());
  const website = useRef("");

  const sendMessage = async (question: string) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || sending) return;
    setMessages((current) => [...current, { role: "user", text: cleanQuestion }]);
    setMessage("");
    setSending(true);
    setError(null);
    try {
      const result = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: cleanQuestion, formStartedAt: startedAt.current, website: website.current }),
      }).then(async (response) => ({ response, body: await response.json().catch(() => null) }));
      if (!result.response.ok || !result.body?.ok) throw new Error("Unable to send question.");
      setMessages((current) => [...current, { role: "assistant", text: result.body.answer }]);
    } catch {
      setError("The assistant is unavailable right now. Please use the contact page or call us directly.");
    } finally {
      setSending(false);
    }
  };

  return <Box sx={{ position: "fixed", right: { xs: 16, sm: 24 }, bottom: { xs: 16, sm: 24 }, zIndex: 1500 }}>
    {open && <Box id="website-assistant" role="dialog" aria-label="Law and Lawyers website assistant" sx={{ width: { xs: "calc(100vw - 32px)", sm: 410 }, overflow: "hidden", border: "1px solid rgba(34, 69, 138, 0.18)", borderRadius: "18px", bgcolor: "#fff", boxShadow: "0 24px 60px rgba(13, 20, 36, 0.28)", mb: 1.5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, color: "#fff", px: 2.25, py: 1.75, background: "linear-gradient(135deg, #168fca 0%, #2874c9 100%)" }}>
        <Box sx={{ display: "grid", placeItems: "center", width: 43, height: 43, borderRadius: "50%", bgcolor: "#fff", color: "#1d609f", boxShadow: "0 4px 14px rgba(0,0,0,.18)" }}><SmartToyRounded fontSize="small" /></Box>
        <Box sx={{ flex: 1, minWidth: 0 }}><Typography sx={{ fontWeight: 800, fontSize: 16, lineHeight: 1.2 }}>Law & Lawyers Assistant</Typography><Box sx={{ display: "flex", alignItems: "center", gap: 0.45, mt: 0.4 }}><VerifiedRounded sx={{ fontSize: 14, color: "#d8f4ff" }} /><Typography sx={{ color: "#e7f8ff", fontSize: 11.5 }}>Website services guide</Typography></Box></Box>
        <IconButton onClick={() => setOpen(false)} aria-label="Close website assistant" sx={{ color: "#fff" }}><Close fontSize="small" /></IconButton>
      </Box>
      <Box sx={{ height: { xs: 300, sm: 335 }, overflowY: "auto", display: "grid", alignContent: "start", gap: 1.35, p: 1.75, bgcolor: "#f5f9fc" }}>
        {messages.map((item, index) => item.role === "assistant" ? <Box key={`${item.role}-${index}`} sx={{ display: "flex", alignItems: "end", gap: 0.85, maxWidth: "94%" }}><Box sx={{ display: "grid", placeItems: "center", flexShrink: 0, width: 28, height: 28, borderRadius: "50%", bgcolor: "#1e79bd", color: "#fff" }}><AutoAwesomeRounded sx={{ fontSize: 16 }} /></Box><Box><Typography sx={{ color: "#6c8098", fontSize: 10.5, fontWeight: 700, mb: 0.35 }}>LAW & LAWYERS ASSISTANT</Typography><Box sx={{ bgcolor: "#e2f1f8", color: "#1f3d5d", borderRadius: "4px 14px 14px 14px", px: 1.5, py: 1.15 }}><Typography sx={{ fontSize: 14, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{item.text}</Typography></Box></Box></Box> : <Box key={`${item.role}-${index}`} sx={{ justifySelf: "end", maxWidth: "82%", bgcolor: "#22458a", color: "#fff", borderRadius: "14px 4px 14px 14px", px: 1.5, py: 1.2 }}><Typography sx={{ fontSize: 14, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{item.text}</Typography></Box>)}
        {sending && <Box sx={{ display: "flex", alignItems: "center", gap: 0.85 }}><Box sx={{ display: "grid", placeItems: "center", width: 28, height: 28, borderRadius: "50%", bgcolor: "#1e79bd", color: "#fff" }}><AutoAwesomeRounded sx={{ fontSize: 16 }} /></Box><Box sx={{ bgcolor: "#e2f1f8", borderRadius: "4px 14px 14px 14px", px: 1.5, py: 1.1 }}><Typography sx={{ color: "#526d87", fontSize: 13 }}>Finding an answer...</Typography></Box></Box>}
      </Box>
      <Box sx={{ borderTop: "1px solid rgba(34, 69, 138, 0.12)", p: 1.5, bgcolor: "#fff" }}>
        <Box sx={{ display: "flex", gap: 0.75, overflowX: "auto", pb: 1 }}>{quickQuestions.map((question) => <Button key={question} onClick={() => sendMessage(question)} disabled={sending} sx={{ flexShrink: 0, border: "1px solid rgba(34, 69, 138, 0.2)", borderRadius: "999px", color: "#22458a", fontSize: 11, fontWeight: 700, px: 1.1, py: 0.4, textTransform: "none", "&:hover": { bgcolor: "#e8f4fb" } }}>{question}</Button>)}</Box>
        <Box component="form" onSubmit={(event) => { event.preventDefault(); sendMessage(message); }} sx={{ display: "flex", alignItems: "end", gap: 0.75 }}><TextField fullWidth value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask about services, quotes or contact" slotProps={{ htmlInput: { maxLength: 900, "aria-label": "Ask a website question" } }} multiline maxRows={3} size="small" sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", bgcolor: "#fff" } }} /><IconButton type="submit" disabled={!message.trim() || sending} aria-label="Send message" sx={{ bgcolor: "#ee6048", color: "#fff", borderRadius: "9px", width: 44, height: 40, "&:hover": { bgcolor: "#d94d37" }, "&.Mui-disabled": { bgcolor: "#f5b8ae" } }}><SendRounded fontSize="small" /></IconButton></Box>
        {error && <Typography role="alert" sx={{ color: "#b42318", fontSize: 12, lineHeight: 1.4, mt: 1 }}>{error}</Typography>}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.7, mt: 1.25 }}><VerifiedRounded sx={{ color: "#168fca", fontSize: 15 }} /><Typography sx={{ color: "#60728f", fontSize: 11, lineHeight: 1.4 }}>Website guidance only. For legal advice, <Link to="/contact" onClick={() => setOpen(false)} style={{ color: "#22458a", fontWeight: 700 }}>contact the team</Link>.</Typography></Box>
      </Box>
    </Box>}
    <Button onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-controls="website-assistant" startIcon={open ? <Close /> : <ForumRounded />} sx={{ minHeight: 50, borderRadius: "999px", bgcolor: "#22458a", color: "#fff", boxShadow: "0 10px 24px rgba(34, 69, 138, 0.28)", px: 2.25, fontWeight: 800, textTransform: "none", "&:hover": { bgcolor: "#17366f" }, "&:active": { transform: "translateY(1px)" } }}>{open ? "Close" : "Ask Law & Lawyers"}</Button>
  </Box>;
}
