import { SnapshotAction } from '@angular/fire/database';

export function createInitAlias(email: string): string {
  return email.substr(0, email.indexOf("@"));
}

export function addfireKey(c: SnapshotAction<any>[]) {
  return c.map((c: SnapshotAction<any>) => {
    return (
      { fireKey: c.payload.key,
        ...c.payload.val()
      }
    )}
  );
}

export function getPureObject(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

export function stripCommas(val: string): number {
  let v = val+"";
  return +(v.replace(",", ""));
}
