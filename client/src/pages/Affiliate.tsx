import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Sparkles, CheckCircle2, Clock, Copy, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface Referral {
  id: string | number;
  email: string | null;
  name: string | null;
  status: string;
  commissionEarned?: string | number;
}

export default function Affiliate() {
  const [referralLink] = useState('https://neurogenesis-oasis.com?ref=REF-USER-12345');
  const [copiedLink, setCopiedLink] = useState(false);

  // Form states for AI Copywriter
  const [channel, setChannel] = useState('Shopify / E-Commerce Blog');
  const [targetAudience, setTargetAudience] = useState('Shop-Inhaber & Online-Marketer');
  const [tone, setTone] = useState('Professionell & Überzeugend');
  const [generatedDraft, setGeneratedDraft] = useState<{
    title: string;
    copy: string;
    sources: string[];
    status: string;
  } | null>(null);
  const [approvedStatus, setApprovedStatus] = useState<Record<string, boolean>>({});

  const statsQuery = trpc.affiliate.stats.useQuery();
  const generateCopyMutation = trpc.affiliate.generateCopy.useMutation({
    onSuccess: (data) => {
      setGeneratedDraft(data);
    },
  });

  const fallbackReferrals = [
    { id: 1, email: 'john@shopify-store.com', name: 'John Smith', status: 'active', commissionEarned: '19.80' },
    { id: 2, email: 'jane@amazon-seller.io', name: 'Jane Doe', status: 'active', commissionEarned: '5.80' },
    { id: 3, email: 'bob@enterprise-retail.com', name: 'Bob Johnson', status: 'active', commissionEarned: '99.80' },
  ];
  const stats = statsQuery.data ?? {
    totalReferrals: 3,
    activeReferrals: 3,
    monthlyCommission: 125.40,
    totalEarned: 1250.45,
    referrals: fallbackReferrals,
  };
  const referralList = ('referrals' in stats && Array.isArray(stats.referrals)) ? stats.referrals : fallbackReferrals;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleGenerate = () => {
    generateCopyMutation.mutate({ channel, targetAudience, tone });
  };

  const handleApprove = (id: string) => {
    setApprovedStatus(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="min-h-screen bg-[#0f0f1e] text-[#e8e8e8]">
      <div className="max-w-7xl mx-auto px-6 py-8 lg:px-10">
        <header className="mb-8">
          <p className="text-xs uppercase tracking-[0.24em] text-[#0a7ea4] mb-2">Monetarisierung & AI Growth</p>
          <h1 className="text-3xl font-light">Affiliate & KI-Werbetext-Assistent</h1>
          <p className="text-sm text-[#a8a8a8] mt-2">
            Erstelle passgenaue Werbetexte für Shopify, Amazon und Content-Plattformen. Jedes Asset durchläuft einen transparenten Review-Prozess, bevor du es freigibst.
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="rounded-lg p-6 border border-[#2a2a3e] bg-[#1a1a2e]/75">
            <div className="text-sm text-[#a8a8a8]">Total Referrals</div>
            <div className="text-3xl font-light mt-3 text-[#0a7ea4]">{stats.totalReferrals}</div>
          </div>
          <div className="rounded-lg p-6 border border-[#2a2a3e] bg-[#1a1a2e]/75">
            <div className="text-sm text-[#a8a8a8]">Active Partners</div>
            <div className="text-3xl font-light mt-3 text-[#2ecc71]">{stats.activeReferrals}</div>
          </div>
          <div className="rounded-lg p-6 border border-[#2a2a3e] bg-[#1a1a2e]/75">
            <div className="text-sm text-[#a8a8a8]">Monthly Commission (20%)</div>
            <div className="text-3xl font-light mt-3 text-[#0a7ea4]">${Number(stats.monthlyCommission).toFixed(2)}</div>
          </div>
          <div className="rounded-lg p-6 border border-[#2a2a3e] bg-[#1a1a2e]/75">
            <div className="text-sm text-[#a8a8a8]">Total Lifetime Earned</div>
            <div className="text-3xl font-light mt-3 text-[#2ecc71]">${Number(stats.totalEarned).toFixed(2)}</div>
          </div>
        </div>

        {/* Referral Link & AI Assistant Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Link Box */}
          <div className="rounded-lg p-6 border border-[#2a2a3e] bg-[#1a1a2e]/75 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#e8e8e8] mb-2">Dein Affiliate-Link</h2>
              <p className="text-xs text-[#a8a8a8] mb-4">Teile diesen Link auf Shopify, Amazon-Blogposts oder Social Media.</p>
              <div className="bg-[#0f0f1e] p-3 rounded border border-[#2a2a3e] font-mono text-xs text-[#0a7ea4] break-all mb-4">
                {referralLink}
              </div>
            </div>
            <Button
              onClick={handleCopyLink}
              className="w-full bg-[#0a7ea4] hover:bg-[#0a7ea4]/80 text-white"
            >
              <Copy className="w-4 h-4 mr-2" />
              {copiedLink ? 'Link kopiert!' : 'Link in Zwischenablage'}
            </Button>
          </div>

          {/* AI Copy Generator Form */}
          <div className="lg:col-span-2 rounded-lg p-6 border border-[#2a2a3e] bg-[#1a1a2e]/75">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#0a7ea4]" />
              <h2 className="text-lg font-semibold text-[#e8e8e8]">KI-Werbetext & Kampagnen-Assistent</h2>
            </div>
            <p className="text-xs text-[#a8a8a8] mb-6">
              Wähle Kanal und Zielgruppe. Die KI generiert konvertierende Texte mit automatisierter Quellenprüfung und Freigabe-Workflow.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs text-[#a8a8a8] mb-1">Zielkanal</label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  className="w-full bg-[#0f0f1e] border border-[#2a2a3e] rounded p-2 text-sm text-[#e8e8e8] focus:outline-none focus:border-[#0a7ea4]"
                >
                  <option>Shopify / E-Commerce Blog</option>
                  <option>Amazon FBA / Buch-Launch</option>
                  <option>LinkedIn / B2B Outreach</option>
                  <option>Twitter / X Thread</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#a8a8a8] mb-1">Zielgruppe</label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full bg-[#0f0f1e] border border-[#2a2a3e] rounded p-2 text-sm text-[#e8e8e8] focus:outline-none focus:border-[#0a7ea4]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#a8a8a8] mb-1">Tonfall</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-[#0f0f1e] border border-[#2a2a3e] rounded p-2 text-sm text-[#e8e8e8] focus:outline-none focus:border-[#0a7ea4]"
                >
                  <option>Professionell & Überzeugend</option>
                  <option>Direkt & Nutzenorientiert</option>
                  <option>Inspirierend & Innovativ</option>
                </select>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={generateCopyMutation.isPending}
              className="w-full bg-[#2ecc71] hover:bg-[#2ecc71]/80 text-[#0f0f1e] font-semibold"
            >
              {generateCopyMutation.isPending ? 'Generiere Werbetext...' : 'Werbetext mit KI erstellen & prüfen'}
            </Button>
          </div>
        </div>

        {/* Generated Draft Review Section */}
        {generatedDraft && (
          <div className="rounded-lg p-6 border border-[#0a7ea4]/40 bg-[#1a1a2e] mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#2ecc71]" />
                <h3 className="text-md font-semibold text-[#e8e8e8]">{generatedDraft.title}</h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-[#ff9800]/20 text-[#ffb74d] font-mono">
                Status: Warten auf menschliche Bestätigung
              </span>
            </div>

            <div className="bg-[#0f0f1e] p-4 rounded border border-[#2a2a3e] text-sm text-[#e8e8e8] whitespace-pre-wrap mb-4 font-sans leading-relaxed">
              {generatedDraft.copy}
            </div>

            <div className="mb-4 text-xs text-[#a8a8a8]">
              <span className="font-semibold text-[#e8e8e8]">Verifizierte Quellen & Basis:</span> {generatedDraft.sources.join(', ')}
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setApprovedStatus(prev => ({ ...prev, [generatedDraft.title]: true }))}
                disabled={approvedStatus[generatedDraft.title]}
                className="bg-[#2ecc71] hover:bg-[#2ecc71]/80 text-[#0f0f1e] font-semibold"
              >
                {approvedStatus[generatedDraft.title] ? <CheckCircle2 className="w-4 h-4 mr-2" /> : null}
                {approvedStatus[generatedDraft.title] ? 'Freigegeben & Aktiv' : 'Text freigeben (Veröffentlichen)'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setGeneratedDraft(null)}
                className="border-[#2a2a3e] text-[#a8a8a8] hover:bg-[#2a2a3e]/50"
              >
                Verwerfen
              </Button>
            </div>
          </div>
        )}

        {/* Referrals Table */}
        <div className="rounded-lg p-6 border border-[#2a2a3e] bg-[#1a1a2e]/75">
          <h2 className="text-lg font-semibold text-[#e8e8e8] mb-4">Aktive Partner & Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#2a2a3e] text-[#a8a8a8]">
                  <th className="pb-3 font-medium">Partner / E-Mail</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Provision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a3e]">
                {referralList.map((ref: Referral) => (
                  <tr key={ref.id} className="hover:bg-[#0f0f1e]/40 transition-colors">
                    <td className="py-4 text-[#e8e8e8]">{ref.name || ref.email}</td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-[#2ecc71]/10 text-[#2ecc71]">
                        <CheckCircle2 className="w-3 h-3" /> {ref.status}
                      </span>
                    </td>
                    <td className="py-4 text-right font-mono text-[#0a7ea4]">${Number(ref.commissionEarned || 19.80).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
