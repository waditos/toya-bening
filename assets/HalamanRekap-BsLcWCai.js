import{m as c,e as i,f as R,a as t,A as L,w as S,F as g,p as m,d as b,t as n,c as u,s as E,l as r,n as M}from"./index-CjqUi4bS.js";import{r as V,u as j}from"./api-CSjYF7iR.js";import{u as G}from"./useAppStore-5zWrKyT4.js";const U={class:"step-card"},H={class:"step-body"},J={style:{display:"flex",gap:"8px","margin-bottom":"12px"}},Y=["value"],O=["value"],K={key:0,class:"loading-dots"},q={key:1,class:"error-msg"},Q={class:"rekap-stats"},W={class:"stat-card"},X={class:"stat-value"},Z={class:"stat-card"},tt={class:"stat-value"},et={class:"stat-card"},at={class:"stat-value"},st={class:"stat-card",style:{background:"#D1FAE5"}},nt={class:"stat-value",style:{color:"#065F46"}},lt={class:"stat-card",style:{background:"#FEE2E2"}},ot={class:"stat-value",style:{color:"#DC2626"}},it={class:"stat-card"},rt={class:"stat-value",style:{"font-size":"20px"}},dt={style:{overflow:"auto",flex:"1","border-radius":"10px",border:"1px solid #E2E8F0"}},ut={class:"rekap-table",style:{"min-width":"600px"}},pt={style:{"text-align":"center"}},ct={style:{"font-family":"monospace","font-size":"11px"}},ht={style:{"font-size":"13px"}},vt={style:{"text-align":"center"}},gt={style:{"text-align":"center","font-weight":"600"}},yt={style:{"text-align":"center","font-weight":"600"}},xt={style:{"text-align":"right","font-weight":"600","font-family":"monospace"}},mt=["onClick"],bt={key:1,style:{"font-size":"14px",color:"var(--success)","font-weight":"700"}},ft={key:3,style:{"text-align":"center",padding:"30px",color:"var(--text-secondary)"}},wt={width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5",style:{"margin-bottom":"8px"}},Lt={__name:"HalamanRekap",setup(kt){const z=E(),{reset:F}=G(),y=new Date,h=c(y.getMonth()+1),v=c(y.getFullYear()),l=c([]),p=c(!1),d=c(""),f=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],T=u(()=>{const s=y.getFullYear();return[s-2,s-1,s,s+1]}),x=u(()=>l.value.reduce((s,e)=>s+(parseFloat(e.MeterBaru)||0),0).toFixed(1)),$=u(()=>l.value.length===0?"0":(parseFloat(x.value)/l.value.length).toFixed(1)),w=u(()=>l.value.filter(s=>s.StatusBayar==="Lunas").length),k=u(()=>l.value.filter(s=>s.StatusBayar!=="Lunas").length),_=u(()=>l.value.reduce((e,a)=>e+(parseFloat(a.Tagihan)||0),0).toLocaleString("id-ID"));function B(s){return(parseFloat(s)||0).toLocaleString("id-ID")}async function A(s,e){try{const a=await j(s,"Lunas");a.success?l.value[e].StatusBayar="Lunas":d.value=a.error||"Gagal memperbarui status"}catch{d.value="Gagal terhubung ke server"}}async function C(){p.value=!0,d.value="";try{const s=await V(String(h.value),String(v.value));s.success?l.value=s.data||[]:d.value=s.error||"Gagal memuat data"}catch{d.value="Gagal terhubung ke server"}p.value=!1}function N(){const s=l.value.map((o,D)=>{const P=o.StatusBayar==="Lunas"?"Lunas":"Belum";return`<tr>
      <td style="text-align:center;">${D+1}</td>
      <td style="font-family:monospace;">${o.PelangganID}</td>
      <td>${o.Nama}</td>
      <td style="text-align:center;">${o.MeterLalu||"-"}</td>
      <td style="text-align:center;font-weight:600;">${o.MeterBaru}</td>
      <td style="text-align:center;font-weight:600;">${o.Pemakaian||0}</td>
      <td style="text-align:right;font-weight:600;font-family:monospace;">${B(o.Tagihan)}</td>
      <td style="text-align:center;">${P}</td>
    </tr>`}).join(""),e=`
    <html><head>
      <title>Rekap Bulanan - Toya Bening</title>
      <style>
        @page { margin: 8mm; size: A4 landscape; }
        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11px; color: #222; margin:0; padding:0; }
        h2 { text-align: center; color: #1A56DB; margin:0 0 4px; font-size:18px; }
        .sub { text-align: center; color: #555; font-size:12px; margin-bottom:4px; }
        .summary { text-align: center; font-size:11px; margin-bottom:10px; color: #333; }
        table { width: 100%; border-collapse: collapse; }
        th {
          background: #1A56DB; color: white; padding: 7px 6px;
          font-size: 11px; text-align: left; font-weight: 600;
          border: 1px solid #1A56DB;
        }
        td {
          padding: 5px 6px; border: 1px solid #CBD5E1;
          font-size: 11px;
        }
        tr:nth-child(even) { background: #F1F5F9; }
        .lunas { font-weight:600; color:#065F46; }
        .belum { font-weight:600; color:#DC2626; }
        .footer {
          text-align: center; margin-top: 16px; padding-top: 10px;
          border-top: 2px solid #1A56DB; font-size: 10px; color: #666;
          display: flex; justify-content: space-between;
        }
        .ttd { margin-top: 20px; display: flex; justify-content: space-between; font-size: 11px; }
        .ttd div { text-align: center; width: 200px; }
        .ttd .line { margin-top: 40px; border-top: 1px solid #000; padding-top: 4px; }
      </style>
    </head><body>
      <h2>TOYA BENING</h2>
      <div class="sub">Pencatatan Meter Air</div>
      <div class="sub" style="font-weight:600;">REKAP BULANAN — ${f[h.value-1].toUpperCase()} ${v.value}</div>
      <div class="summary">
        Catatan: ${l.value.length} |
        Total Pemakaian: ${x.value} m³ |
        Lunas: ${w.value} |
        Belum Lunas: ${k.value} |
        Total Tagihan: Rp ${_.value}
      </div>
      <table>
        <tr>
          <th style="width:32px;text-align:center;">No</th>
          <th style="width:72px;">ID</th>
          <th>Nama</th>
          <th style="width:60px;text-align:center;">Mtr Lalu</th>
          <th style="width:60px;text-align:center;">Mtr Baru</th>
          <th style="width:50px;text-align:center;">Pakai</th>
          <th style="width:80px;text-align:right;">Tagihan</th>
          <th style="width:56px;text-align:center;">Status</th>
        </tr>
        ${s}
      </table>
      <div class="footer">
        <span>Dicetak dari Toya Bening</span>
        <span>${new Date().toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"})}</span>
      </div>
      <div class="ttd">
        <div>Petugas,<div class="line">( &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; )</div></div>
        <div>Mengetahui,<div class="line">( &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; )</div></div>
      </div>
    </body></html>
  `,a=window.open("","_blank","width=900,height=700");a?(a.document.write(e),a.document.close(),a.focus(),setTimeout(()=>{a.print()},600)):d.value="Popup diblokir. Izinkan popup untuk cetak."}function I(){F(),z.push("/scan")}return(s,e)=>(r(),i("div",U,[e[13]||(e[13]=R('<div class="step-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div><h2 class="step-title">Rekap Bulanan</h2><p class="step-desc">Data pencatatan meter per bulan</p>',3)),t("div",H,[t("div",J,[L(t("select",{"onUpdate:modelValue":e[0]||(e[0]=a=>h.value=a),class:"form-input",style:{flex:"1"}},[(r(),i(g,null,m(f,(a,o)=>t("option",{key:o,value:o+1},n(a),9,Y)),64))],512),[[S,h.value]]),L(t("select",{"onUpdate:modelValue":e[1]||(e[1]=a=>v.value=a),class:"form-input",style:{width:"100px"}},[(r(!0),i(g,null,m(T.value,a=>(r(),i("option",{key:a,value:a},n(a),9,O))),128))],512),[[S,v.value]]),t("button",{class:"btn btn-primary",style:{width:"auto",padding:"12px 16px"},onClick:C},[...e[2]||(e[2]=[t("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[t("polyline",{points:"23 4 23 10 17 10"}),t("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"})],-1)])])]),p.value?(r(),i("div",K,[...e[3]||(e[3]=[t("span",null,null,-1),t("span",null,null,-1),t("span",null,null,-1)])])):b("",!0),d.value?(r(),i("div",q,n(d.value),1)):b("",!0),!p.value&&l.value.length>0?(r(),i(g,{key:2},[t("div",Q,[t("div",W,[t("div",X,n(l.value.length),1),e[4]||(e[4]=t("div",{class:"stat-label"},"Total Catatan",-1))]),t("div",Z,[t("div",tt,n(x.value),1),e[5]||(e[5]=t("div",{class:"stat-label"},"Total m³",-1))]),t("div",et,[t("div",at,n($.value),1),e[6]||(e[6]=t("div",{class:"stat-label"},"Rata-rata m³",-1))]),t("div",st,[t("div",nt,n(w.value),1),e[7]||(e[7]=t("div",{class:"stat-label"},"Lunas",-1))]),t("div",lt,[t("div",ot,n(k.value),1),e[8]||(e[8]=t("div",{class:"stat-label"},"Belum Lunas",-1))]),t("div",it,[t("div",rt,"Rp "+n(_.value),1),e[9]||(e[9]=t("div",{class:"stat-label"},"Total Tagihan",-1))])]),t("div",dt,[t("table",ut,[e[10]||(e[10]=t("thead",null,[t("tr",null,[t("th",{style:{width:"36px"}},"No"),t("th",{style:{width:"70px"}},"ID"),t("th",null,"Nama"),t("th",{style:{width:"70px"}},"Mtr Lalu"),t("th",{style:{width:"70px"}},"Mtr Baru"),t("th",{style:{width:"60px"}},"Pakai"),t("th",{style:{width:"80px"}},"Tagihan"),t("th",{style:{width:"70px"}},"Status"),t("th",{style:{width:"56px"}},"Aksi")])],-1)),t("tbody",null,[(r(!0),i(g,null,m(l.value,(a,o)=>(r(),i("tr",{key:a.ID,class:M({"row-lunas":a.StatusBayar==="Lunas"})},[t("td",pt,n(o+1),1),t("td",ct,n(a.PelangganID),1),t("td",ht,n(a.Nama),1),t("td",vt,n(a.MeterLalu||"-"),1),t("td",gt,n(a.MeterBaru),1),t("td",yt,n(a.Pemakaian||0),1),t("td",xt,n(B(a.Tagihan)),1),t("td",null,[t("span",{class:M(["badge",a.StatusBayar==="Lunas"?"badge-success":"badge-warning"]),style:{"font-size":"10px"}},n(a.StatusBayar||"Blm Lunas"),3)]),t("td",null,[a.StatusBayar!=="Lunas"?(r(),i("button",{key:0,class:"btn btn-success",style:{padding:"3px 8px","font-size":"10px",width:"auto","min-width":"0"},onClick:D=>A(a.ID,o)}," Bayar ",8,mt)):(r(),i("span",bt,"✓"))])],2))),128))])])])],64)):!p.value&&!d.value?(r(),i("div",ft,[(r(),i("svg",wt,[...e[11]||(e[11]=[t("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"},null,-1),t("polyline",{points:"14 2 14 8 20 8"},null,-1)])])),e[12]||(e[12]=t("p",null,"Pilih bulan dan tahun, lalu klik tombol refresh",-1))])):b("",!0)]),t("div",{class:"btn-group"},[t("button",{class:"btn btn-outline",onClick:N},"Cetak Rekap"),t("button",{class:"btn btn-primary",onClick:I},"Scan Baru")])]))}};export{Lt as default};
