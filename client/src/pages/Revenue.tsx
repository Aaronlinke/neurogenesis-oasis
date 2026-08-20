import { trpc } from "@/lib/trpc";

const SOURCES = [
  { key: "subscriptions", label: "Subscriptions", color: "#0a7ea4" },
  { key: "apiRevenue", label: "API usage", color: "#2ecc71" },
  { key: "affiliateRevenue", label: "Affiliate", color: "#ff9800" },
] as const;

export default function Revenue() {
  const { data, isLoading, isError } = trpc.revenue.stats.useQuery();
  const revenue = data ?? { totalMRR: 0, totalARR: 0, apiRevenue: 0, affiliateRevenue: 0 };
  const subscriptions = Math.max(0, revenue.totalMRR);
  const total = subscriptions + revenue.apiRevenue + revenue.affiliateRevenue;
  const sourceValues = {
    subscriptions,
    apiRevenue: revenue.apiRevenue,
    affiliateRevenue: revenue.affiliateRevenue,
  };

  return (
    <div className="min-h-screen bg-[#0f0f1e] text-[#e8e8e8]">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <header className="mb-8">
          <p className="mb-2 text-xs uppercase tracking-[0.24em] text-[#0a7ea4]">Financial operations</p>
          <h1 className="text-3xl font-light">Revenue Dashboard</h1>
          <p className="mt-2 text-sm text-[#a8a8a8]">
            Die Werte stammen aus den gespeicherten Revenue-Logs. Ohne verbuchte Transaktionen werden bewusst keine Prognosen angezeigt.
          </p>
        </header>

        {isError && (
          <div className="mb-6 rounded-lg border border-[#d32f2f] bg-[#d32f2f]/10 p-4 text-sm text-[#ff8a80]">
            Revenue-Daten konnten nicht geladen werden. Bitte prüfe die Serververbindung.
          </div>
        )}

        <section className="grid gap-5 md:grid-cols-3" aria-label="Revenue-Kennzahlen">
          <MetricCard label="Monthly recurring revenue" value={isLoading ? "—" : `$${subscriptions.toFixed(2)}`} tone="blue" />
          <MetricCard label="Annual recurring revenue" value={isLoading ? "—" : `$${revenue.totalARR.toFixed(2)}`} tone="blue" />
          <MetricCard label="Zusätzliche Erlöse" value={isLoading ? "—" : `$${(revenue.apiRevenue + revenue.affiliateRevenue).toFixed(2)}`} tone="green" />
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <Panel title="Revenue breakdown" subtitle="Aktuelle Summen nach Quelle">
            <div className="space-y-5">
              {SOURCES.map((source) => {
                const amount = sourceValues[source.key];
                const share = total > 0 ? (amount / total) * 100 : 0;
                return (
                  <div key={source.key}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-[#e8e8e8]">{source.label}</span>
                      <span style={{ color: source.color }}>${amount.toFixed(2)} · {share.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#2a2a3e]">
                      <div className="h-full rounded-full transition-all" style={{ width: `${share}%`, backgroundColor: source.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel title="Data integrity" subtitle="Status der aktuellen Abrechnung">
            <div className="space-y-4 text-sm">
              <StatusRow label="Backend query" value={isLoading ? "Loading" : isError ? "Error" : "Connected"} positive={!isError} />
              <StatusRow label="Revenue logs" value={total > 0 ? "Transactions recorded" : "No transactions yet"} positive={total > 0} />
              <StatusRow label="Forecasting" value="Disabled until data exists" positive={false} />
            </div>
            <p className="mt-6 border-t border-[#2a2a3e] pt-4 text-xs leading-5 text-[#a8a8a8]">
              Das Dashboard erzeugt keine künstlichen Umsätze. Erst bestätigte Stripe-Zahlungen, API-Nutzung oder Affiliate-Abrechnungen werden hier berücksichtigt.
            </p>
          </Panel>
        </section>

        <section className="mt-8">
          <Panel title="Next operational step" subtitle="Damit Einnahmen entstehen, müssen reale Kundenzahlungen und Nutzung verbucht werden">
            <div className="grid gap-4 text-sm text-[#a8a8a8] md:grid-cols-3">
              <ActionCard number="01" title="Stripe aktivieren" text="Checkout und Webhook-Ziel im Stripe-Sandbox-Konto verifizieren." />
              <ActionCard number="02" title="Usage metering" text="API-Anfragen mit Key, Nutzer und Zeitstempel erfassen." />
              <ActionCard number="03" title="Akquise" text="Ein konkretes B2B-Angebot mit Zielgruppe und Preis veröffentlichen." />
            </div>
          </Panel>
        </section>
      </div>
    </div>
  );
}

function MetricCard({ label, value, tone }: { label: string; value: string; tone: "blue" | "green" }) {
  return (
    <div className="rounded-lg border border-[#2a2a3e] bg-[#1a1a2e]/70 p-6">
      <p className="text-sm text-[#a8a8a8]">{label}</p>
      <p className={`mt-3 text-4xl font-light ${tone === "green" ? "text-[#2ecc71]" : "text-[#0a7ea4]"}`}>{value}</p>
    </div>
  );
}

function Panel({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[#2a2a3e] bg-[#1a1a2e]/70 p-6 lg:p-8">
      <h2 className="text-lg font-semibold text-[#e8e8e8]">{title}</h2>
      <p className="mb-6 mt-1 text-sm text-[#a8a8a8]">{subtitle}</p>
      {children}
    </div>
  );
}

function StatusRow({ label, value, positive }: { label: string; value: string; positive: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-[#2a2a3e] pb-3 last:border-0 last:pb-0">
      <span className="text-[#a8a8a8]">{label}</span>
      <span className={positive ? "text-[#2ecc71]" : "text-[#a8a8a8]"}>{value}</span>
    </div>
  );
}

function ActionCard({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="rounded-lg border border-[#2a2a3e] bg-[#0f0f1e]/50 p-4">
      <span className="font-mono text-xs text-[#0a7ea4]">{number}</span>
      <h3 className="mt-3 font-medium text-[#e8e8e8]">{title}</h3>
      <p className="mt-2 leading-5">{text}</p>
    </div>
  );
}
