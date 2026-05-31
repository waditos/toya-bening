import{r as u,e as o,f as j,a as t,B as p,x as F,F as y,p as D,d as x,t as n,y as m,c,s as G,v as H,m as i,i as N}from"./index-DjsnKAhv.js";import{r as Y,u as O}from"./api-CvckTI5P.js";const K={class:"step-card"},q={class:"step-body"},Q={style:{display:"flex",gap:"8px","margin-bottom":"12px"}},W=["value"],X=["value"],Z={key:0,class:"loading-dots"},tt={key:1,class:"error-msg"},et={class:"rekap-stats"},at={class:"stat-card"},st={class:"stat-value"},nt={class:"stat-card"},lt={class:"stat-value"},ot={class:"stat-card"},it={class:"stat-value"},rt={class:"stat-card",style:{background:"#D1FAE5"}},dt={class:"stat-value",style:{color:"#065F46"}},ut={class:"stat-card",style:{background:"#FEE2E2"}},pt={class:"stat-value",style:{color:"#DC2626"}},ct={class:"stat-card"},vt={class:"stat-value",style:{"font-size":"20px"}},gt={style:{overflow:"auto",flex:"1","border-radius":"10px",border:"1px solid #E2E8F0"}},ht={class:"rekap-table",style:{"min-width":"600px"}},yt={style:{"text-align":"center"}},xt={style:{"font-family":"monospace","font-size":"11px"}},mt={style:{"font-size":"13px"}},bt={style:{"text-align":"center"}},ft={style:{"text-align":"center","font-weight":"600"}},wt={style:{"text-align":"center","font-weight":"600"}},kt={style:{"text-align":"right","font-weight":"600","font-family":"monospace"}},Bt=["onClick"],_t={key:1,style:{"font-size":"14px",color:"var(--success)","font-weight":"700"}},Dt={key:0,style:{"margin-top":"12px",padding:"12px",background:"var(--primary-bg)","border-radius":"10px"}},zt={style:{display:"grid","grid-template-columns":"1fr 1fr",gap:"10px"}},Lt={key:3,style:{"text-align":"center",padding:"30px",color:"var(--text-secondary)"}},St={width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5",style:{"margin-bottom":"8px"}},Ft={__name:"HalamanRekap",setup(Mt){const C=H(),{reset:A}=G(),b=new Date,g=u(b.getMonth()+1),h=u(b.getFullYear()),l=u([]),v=u(!1),d=u(""),f=u(""),w=u(""),k=u(""),B=u(""),z=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],P=c(()=>{const s=b.getFullYear();return[s-2,s-1,s,s+1]}),_=c(()=>l.value.reduce((s,e)=>s+(parseFloat(e.MeterBaru)||0),0).toFixed(1)),I=c(()=>l.value.length===0?"0":(parseFloat(_.value)/l.value.length).toFixed(1)),L=c(()=>l.value.filter(s=>s.StatusBayar==="Lunas").length),S=c(()=>l.value.filter(s=>s.StatusBayar!=="Lunas").length),M=c(()=>l.value.reduce((e,a)=>e+(parseFloat(a.Tagihan)||0),0).toLocaleString("id-ID"));function $(s){return(parseFloat(s)||0).toLocaleString("id-ID")}async function R(s){const e=l.value.findIndex(a=>String(a.ID)===String(s));if(e!==-1)try{const a=await O(s,"Lunas");a.success?l.value[e].StatusBayar="Lunas":d.value=a.error||"Gagal memperbarui status"}catch{d.value="Gagal terhubung ke server"}}async function V(){v.value=!0,d.value="";try{const s=await Y(String(g.value),String(h.value));s.success?l.value=s.data||[]:d.value=s.error||"Gagal memuat data"}catch{d.value="Gagal terhubung ke server"}v.value=!1}function E(){const s=l.value.map((r,T)=>{const J=r.StatusBayar==="Lunas"?"Lunas":"Belum";return`<tr>
      <td style="text-align:center;">${T+1}</td>
      <td style="font-family:monospace;">${r.PelangganID}</td>
      <td>${r.Nama}</td>
      <td style="text-align:center;">${r.MeterLalu||"-"}</td>
      <td style="text-align:center;font-weight:600;">${r.MeterBaru}</td>
      <td style="text-align:center;font-weight:600;">${r.Pemakaian||0}</td>
      <td style="text-align:right;font-weight:600;font-family:monospace;">${$(r.Tagihan)}</td>
      <td style="text-align:center;">${J}</td>
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
      <div class="sub" style="font-weight:600;">REKAP BULANAN — ${z[g.value-1].toUpperCase()} ${h.value}</div>
      <div class="summary">
        Catatan: ${l.value.length} |
        Total Pemakaian: ${_.value} m³ |
        Lunas: ${L.value} |
        Belum Lunas: ${S.value} |
        Total Tagihan: Rp ${M.value}
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
        <div>
          ${f.value||"<i>Petugas</i>"}<br/>
          <span style="font-size:9px;">${w.value||"&nbsp;"}</span>
          <div class="line">(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)</div>
        </div>
        <div>
          ${k.value||"<i>Mengetahui</i>"}<br/>
          <span style="font-size:9px;">${B.value||"&nbsp;"}</span>
          <div class="line">(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)</div>
        </div>
      </div>
    </body></html>
  `,a=window.open("","_blank","width=900,height=700");a?(a.document.write(e),a.document.close(),a.focus(),setTimeout(()=>{a.print()},600)):d.value="Popup diblokir. Izinkan popup untuk cetak."}function U(){A(),C.push("/scan")}return(s,e)=>(i(),o("div",K,[e[20]||(e[20]=j('<div class="step-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div><h2 class="step-title">Rekap Bulanan</h2><p class="step-desc">Data pencatatan meter per bulan</p>',3)),t("div",q,[t("div",Q,[p(t("select",{"onUpdate:modelValue":e[0]||(e[0]=a=>g.value=a),class:"form-input",style:{flex:"1"}},[(i(),o(y,null,D(z,(a,r)=>t("option",{key:r,value:r+1},n(a),9,W)),64))],512),[[F,g.value]]),p(t("select",{"onUpdate:modelValue":e[1]||(e[1]=a=>h.value=a),class:"form-input",style:{width:"100px"}},[(i(!0),o(y,null,D(P.value,a=>(i(),o("option",{key:a,value:a},n(a),9,X))),128))],512),[[F,h.value]]),t("button",{class:"btn btn-primary",style:{width:"auto",padding:"12px 16px"},onClick:V},[...e[6]||(e[6]=[t("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[t("polyline",{points:"23 4 23 10 17 10"}),t("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"})],-1)])])]),v.value?(i(),o("div",Z,[...e[7]||(e[7]=[t("span",null,null,-1),t("span",null,null,-1),t("span",null,null,-1)])])):x("",!0),d.value?(i(),o("div",tt,n(d.value),1)):x("",!0),!v.value&&l.value.length>0?(i(),o(y,{key:2},[t("div",et,[t("div",at,[t("div",st,n(l.value.length),1),e[8]||(e[8]=t("div",{class:"stat-label"},"Total Catatan",-1))]),t("div",nt,[t("div",lt,n(_.value),1),e[9]||(e[9]=t("div",{class:"stat-label"},"Total m³",-1))]),t("div",ot,[t("div",it,n(I.value),1),e[10]||(e[10]=t("div",{class:"stat-label"},"Rata-rata m³",-1))]),t("div",rt,[t("div",dt,n(L.value),1),e[11]||(e[11]=t("div",{class:"stat-label"},"Lunas",-1))]),t("div",ut,[t("div",pt,n(S.value),1),e[12]||(e[12]=t("div",{class:"stat-label"},"Belum Lunas",-1))]),t("div",ct,[t("div",vt,"Rp "+n(M.value),1),e[13]||(e[13]=t("div",{class:"stat-label"},"Total Tagihan",-1))])]),t("div",gt,[t("table",ht,[e[14]||(e[14]=t("thead",null,[t("tr",null,[t("th",{style:{width:"36px"}},"No"),t("th",{style:{width:"70px"}},"ID"),t("th",null,"Nama"),t("th",{style:{width:"70px"}},"Mtr Lalu"),t("th",{style:{width:"70px"}},"Mtr Baru"),t("th",{style:{width:"60px"}},"Pakai"),t("th",{style:{width:"80px"}},"Tagihan"),t("th",{style:{width:"70px"}},"Status"),t("th",{style:{width:"56px"}},"Aksi")])],-1)),t("tbody",null,[(i(!0),o(y,null,D(l.value,(a,r)=>(i(),o("tr",{key:a.ID,class:N({"row-lunas":a.StatusBayar==="Lunas"})},[t("td",yt,n(r+1),1),t("td",xt,n(a.PelangganID),1),t("td",mt,n(a.Nama),1),t("td",bt,n(a.MeterLalu||"-"),1),t("td",ft,n(a.MeterBaru),1),t("td",wt,n(a.Pemakaian||0),1),t("td",kt,n($(a.Tagihan)),1),t("td",null,[t("span",{class:N(["badge",a.StatusBayar==="Lunas"?"badge-success":"badge-warning"]),style:{"font-size":"10px"}},n(a.StatusBayar||"Blm Lunas"),3)]),t("td",null,[a.StatusBayar!=="Lunas"?(i(),o("button",{key:0,class:"btn btn-success",style:{padding:"3px 8px","font-size":"10px",width:"auto","min-width":"0"},onClick:T=>R(a.ID)}," Bayar ",8,Bt)):(i(),o("span",_t,"✓"))])],2))),128))])])]),l.value.length>0?(i(),o("div",Dt,[e[17]||(e[17]=t("p",{style:{"font-size":"12px","font-weight":"600",color:"var(--text-secondary)","margin-bottom":"8px"}},"Tanda Tangan Cetak",-1)),t("div",zt,[t("div",null,[e[15]||(e[15]=t("label",{class:"form-label"},"Petugas",-1)),p(t("input",{"onUpdate:modelValue":e[2]||(e[2]=a=>f.value=a),class:"form-input",placeholder:"Nama",style:{"margin-bottom":"4px","font-size":"13px"}},null,512),[[m,f.value]]),p(t("input",{"onUpdate:modelValue":e[3]||(e[3]=a=>w.value=a),class:"form-input",placeholder:"Jabatan",style:{"font-size":"13px"}},null,512),[[m,w.value]])]),t("div",null,[e[16]||(e[16]=t("label",{class:"form-label"},"Mengetahui",-1)),p(t("input",{"onUpdate:modelValue":e[4]||(e[4]=a=>k.value=a),class:"form-input",placeholder:"Nama",style:{"margin-bottom":"4px","font-size":"13px"}},null,512),[[m,k.value]]),p(t("input",{"onUpdate:modelValue":e[5]||(e[5]=a=>B.value=a),class:"form-input",placeholder:"Jabatan",style:{"font-size":"13px"}},null,512),[[m,B.value]])])])])):x("",!0)],64)):!v.value&&!d.value?(i(),o("div",Lt,[(i(),o("svg",St,[...e[18]||(e[18]=[t("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"},null,-1),t("polyline",{points:"14 2 14 8 20 8"},null,-1)])])),e[19]||(e[19]=t("p",null,"Pilih bulan dan tahun, lalu klik tombol refresh",-1))])):x("",!0)]),t("div",{class:"btn-group"},[t("button",{class:"btn btn-outline",onClick:E},"Cetak Rekap"),t("button",{class:"btn btn-primary",onClick:U},"Scan Baru")])]))}};export{Ft as default};
