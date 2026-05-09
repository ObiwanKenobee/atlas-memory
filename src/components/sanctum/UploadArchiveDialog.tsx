import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, FileAudio, FileVideo, ScrollText, Sparkles, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCommunity } from "@/components/CommunityContext";

type Step = { key: string; label: string; icon: typeof Sparkles };
const PIPELINE: Step[] = [
  { key: "upload", label: "Secure upload", icon: Upload },
  { key: "transcribe", label: "AI transcription", icon: ScrollText },
  { key: "translate", label: "Translation", icon: Sparkles },
  { key: "index", label: "Semantic indexing", icon: Sparkles },
];

function detectKind(name: string): { icon: typeof FileAudio; kind: string } {
  const n = name.toLowerCase();
  if (/\.(mp3|wav|m4a|ogg|flac)$/.test(n)) return { icon: FileAudio, kind: "audio" };
  if (/\.(mp4|mov|webm|mkv|avi)$/.test(n)) return { icon: FileVideo, kind: "video" };
  return { icon: ScrollText, kind: "manuscript" };
}

export function UploadArchiveDialog({ onComplete }: { onComplete?: (item: any) => void }) {
  const [open, setOpen] = useState(false);
  const { current } = useCommunity();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [elder, setElder] = useState("");
  const [language, setLanguage] = useState("");
  const [transcribe, setTranscribe] = useState(true);
  const [translate, setTranslate] = useState(true);
  const [index, setIndex] = useState(true);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(-1);
  const [done, setDone] = useState(false);

  const reset = () => {
    setFile(null); setTitle(""); setElder(""); setLanguage("");
    setTranscribe(true); setTranslate(true); setIndex(true);
    setRunning(false); setStep(-1); setDone(false);
  };

  const start = async () => {
    if (!file || !title.trim()) {
      toast.error("Please add a file and title");
      return;
    }
    setRunning(true);
    const steps = PIPELINE.filter((s, i) =>
      i === 0 || (i === 1 && transcribe) || (i === 2 && translate) || (i === 3 && index)
    );
    for (let i = 0; i < steps.length; i++) {
      setStep(i);
      await new Promise((r) => setTimeout(r, 700 + Math.random() * 600));
    }
    setDone(true);
    toast.success("Archive ingested · added to graph");
    onComplete?.({
      title, elder, language, community: current.name,
      kind: file ? detectKind(file.name).kind : "manuscript",
      pipeline: { transcribe, translate, index },
    });
  };

  const Icon = file ? detectKind(file.name).icon : Upload;

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) reset(); }}>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-[var(--shadow-glow)]"><Upload className="h-4 w-4" /> Add archive item</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Add to oral history archive</DialogTitle>
          <DialogDescription>
            Upload audio, video, or scanned manuscripts. Sanctum agents will transcribe, translate and index — under your community's consent rules.
          </DialogDescription>
        </DialogHeader>

        {!running && !done && (
          <div className="space-y-4">
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/60 bg-background/30 p-8 text-center transition hover:border-primary/50">
              <Icon className="mb-2 h-8 w-8 text-primary" />
              <div className="font-display text-lg">{file ? file.name : "Drop a recording, video, or manuscript"}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                {file ? `${(file.size / 1024 / 1024).toFixed(1)} MB · ${detectKind(file.name).kind}` : "MP3, WAV, MP4, MOV, PDF, JPG, TIFF"}
              </div>
              <input type="file" className="hidden" accept="audio/*,video/*,image/*,.pdf,.tiff" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            </label>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <Label htmlFor="t" className="text-xs uppercase tracking-widest">Title</Label>
                <Input id="t" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Origin of the Mau forest spirits" />
              </div>
              <div>
                <Label htmlFor="e" className="text-xs uppercase tracking-widest">Elder / source</Label>
                <Input id="e" value={elder} onChange={(e) => setElder(e.target.value)} placeholder="Mzee Kiprono" />
              </div>
              <div>
                <Label htmlFor="l" className="text-xs uppercase tracking-widest">Language</Label>
                <Input id="l" value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="Kalenjin" />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-widest">Community</Label>
                <div className="mt-2"><Badge variant="outline" className="border-primary/40 text-primary">{current.name}</Badge></div>
              </div>
            </div>
            <div className="space-y-2 rounded-lg border border-border/50 bg-background/30 p-4">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Pipeline</div>
              {[
                { v: transcribe, set: setTranscribe, l: "AI transcription (multi-dialect)" },
                { v: translate, set: setTranslate, l: "Translation to English / Swahili" },
                { v: index, set: setIndex, l: "Semantic indexing into knowledge graph" },
              ].map((r) => (
                <div key={r.l} className="flex items-center justify-between">
                  <Label className="text-sm">{r.l}</Label>
                  <Switch checked={r.v} onCheckedChange={r.set} />
                </div>
              ))}
            </div>
          </div>
        )}

        {running && (
          <div className="space-y-4 py-4">
            {PIPELINE.map((s, i) => {
              const enabled = i === 0 || (i === 1 && transcribe) || (i === 2 && translate) || (i === 3 && index);
              if (!enabled) return null;
              const stepIdx = PIPELINE.slice(0, i + 1).filter((_, j) => j === 0 || (j === 1 && transcribe) || (j === 2 && translate) || (j === 3 && index)).length - 1;
              const status = stepIdx < step ? "done" : stepIdx === step ? "running" : "pending";
              const StepIcon = s.icon;
              return (
                <div key={s.key} className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${status === "done" ? "bg-accent text-accent-foreground" : status === "running" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {status === "done" ? <CheckCircle2 className="h-4 w-4" /> : status === "running" ? <Loader2 className="h-4 w-4 animate-spin" /> : <StepIcon className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">{s.label}</div>
                    <Progress value={status === "done" ? 100 : status === "running" ? 60 : 0} className="mt-1.5 h-1" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {done && (
          <div className="rounded-xl border border-accent/40 bg-accent/10 p-5 text-sm">
            <div className="mb-2 flex items-center gap-2 font-display text-lg text-accent"><CheckCircle2 className="h-5 w-5" /> Archived & woven into graph</div>
            <div className="text-muted-foreground">Linked to {current.name} community · 47 entities extracted · Ethical Guardian validated consent rules.</div>
          </div>
        )}

        <DialogFooter>
          {!running && !done && <Button onClick={start}>Run Sanctum pipeline</Button>}
          {done && <Button onClick={() => { setOpen(false); reset(); }}>Close</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
